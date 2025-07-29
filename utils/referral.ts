// utils/referral.ts
import User from '@/models/user.model';
import Referral from '@/models/referal.model';
import mongoose from 'mongoose';
import { Transaction } from '@/models/transaction.model';

// Referral reward percentages for each generation
const GENERATION_REWARDS = {
    1: 0.05, // 5% for 1st generation
    2: 0.03, // 3% for 2nd generation
    3: 0.02, // 2% for 3rd generation
    4: 0.015, // 1.5% for 4th generation
    5: 0.01, // 1% for 5th generation
    6: 0.005, // 0.5% for 6th generation
    7: 0.005, // 0.5% for 7th generation
};

export async function createReferralChain(userId: string, referrerId: string | null) {
    if (!referrerId) return;

    try {
        // Start with the immediate referrer (1st generation)
        let currentReferrerId = referrerId;
        let generation = 1;

        while (currentReferrerId && generation <= 7) {
            // Create referral record
            await Referral.create({
                userId: new mongoose.Types.ObjectId(userId),
                referrerId: new mongoose.Types.ObjectId(currentReferrerId),
                generation,
                amount: 0, // Will be updated when transactions occur
            });

            // Find the next referrer in the chain
            const currentReferrer = await User.findById(currentReferrerId);
            currentReferrerId = currentReferrer?.parentId || null;
            generation++;
        }
    } catch (error) {
        console.error('Error creating referral chain:', error);
        throw error;
    }
}

export async function calculateAndDistributeReferralRewards(userId: string, transactionAmount: number) {
    console.log(`[ReferralRewards] Process started for userId: ${userId}`);

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        console.error(`[ReferralRewards] Invalid userId: ${userId}`);
        throw new Error('Invalid userId');
    }

    // Validate transactionAmount
    if (typeof transactionAmount !== 'number' || transactionAmount <= 0 || !isFinite(transactionAmount)) {
        console.error(`[ReferralRewards] Invalid transactionAmount: ${transactionAmount}`);
        throw new Error('Invalid transactionAmount');
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const referrals = await Referral.find({ userId }).sort({ generation: 1 }).session(session);
        if (!referrals || referrals.length === 0) {
            console.log(`[ReferralRewards] No referrals found for userId: ${userId}. Process completed.`);
            await session.commitTransaction();
            session.endSession();
            return;
        }

        for (const referral of referrals) {
            // Validate referral fields
            if (!referral.referrerId || !mongoose.Types.ObjectId.isValid(referral.referrerId)) {
                console.warn(`[ReferralRewards] Skipping referral with invalid referrerId: ${referral.referrerId}`);
                continue;
            }
            if (typeof referral.generation !== 'number' || referral.generation < 1 || referral.generation > 7) {
                console.warn(`[ReferralRewards] Skipping referral with invalid generation: ${referral.generation}`);
                continue;
            }

            const rewardPercentage = GENERATION_REWARDS[referral.generation as keyof typeof GENERATION_REWARDS];
            let rewardAmount = transactionAmount * rewardPercentage;

            // Prevent negative or zero rewards, round to 2 decimals
            rewardAmount = Math.max(0, Math.round(rewardAmount * 100) / 100);
            if (rewardAmount <= 0) {
                console.log(`[ReferralRewards] Skipping referralId: ${referral._id} due to zero reward.`);
                continue;
            }

            // Unique reference using referralId and ISO timestamp
            const reference = `referral-${referral._id}-${new Date().toISOString()}`;

            await Transaction.create([{
                userId: referral.referrerId,
                type: 'referral_reward',
                amount: rewardAmount,
                description: `${referral.generation} generation Referral reward`,
                reference,
            }], { session });
            console.log(`[ReferralRewards] Transaction created for referrerId: ${referral.referrerId}, amount: ${rewardAmount}, generation: ${referral.generation}`);

            await Referral.findByIdAndUpdate(referral._id, {
                $inc: { amount: rewardAmount }
            }, { session });
            console.log(`[ReferralRewards] Referral record updated for referralId: ${referral._id}, incremented amount by ${rewardAmount}`);

            await User.findByIdAndUpdate(referral.referrerId, {
                $inc: { balance: rewardAmount }
            }, { session });
            console.log(`[ReferralRewards] User balance updated for referrerId: ${referral.referrerId}, incremented balance by ${rewardAmount}`);

            await Transaction.updateOne(
                { userId: referral.referrerId, type: 'referral_reward', reference },
                { $set: { status: 'success' } },
                { session }
            );
            console.log(`[ReferralRewards] Transaction status updated to success for reference: ${reference}`);
        }

        await session.commitTransaction();
        session.endSession();
        console.log(`[ReferralRewards] Process completed for userId: ${userId}`);
        return;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(`[ReferralRewards] Process failed for userId: ${userId}. Error: ${(error as Error)?.message || error}`);
        throw error;
    }
}