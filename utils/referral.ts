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
    try {
        // Find all referrers for this user
        const referrals = await Referral.find({ userId }).sort({ generation: 1 });
        if (!referrals || referrals.length === 0) 
        for (const referral of referrals) {
            // Calculate reward based on generation
            const rewardPercentage = GENERATION_REWARDS[referral.generation as keyof typeof GENERATION_REWARDS];
            const rewardAmount = transactionAmount * rewardPercentage;
            const reference = `referral-${referral._id}-${Date.now()}`;
            if (rewardAmount <= 0) continue; // Skip if no reward is applicable

            // create a new transaction record for the referrer reward
            await Transaction.create({
                userId: referral.referrerId,
                type: 'referral_reward',
                amount: rewardAmount,
                description: `${referral.generation} generation Referral reward`,
                reference, // Unique reference for tracking
            });

            // Update referral record with the reward
            await Referral.findByIdAndUpdate(referral._id, {
                $inc: { amount: rewardAmount }
            });

            // Update referrer's balance
            await User.findByIdAndUpdate(referral.referrerId, {
                $inc: { balance: rewardAmount }
            });

            //update transaction status to success
            await Transaction.updateOne(
                { userId: referral.referrerId, type: 'referral_reward', reference },
                { $set: { status: 'success' } }
            );
        }
        return;
    } catch (error) {
        console.error('Error distributing referral rewards:', error);
        throw error;
    }
}
