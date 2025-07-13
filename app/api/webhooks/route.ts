import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import connectServer from '@/config/mongoose';
import User from '@/models/user.model';
import { Transaction } from '@/models/transaction.model';
import crypto from 'crypto';
import { calculateAndDistributeReferralRewards } from '@/utils/referral';

const SERVICE_FEE = 50;
const MONNIFY_CLIENT_SECRET = process.env.MONIFY_API_SECRET!;

// Helper to verify Monnify signature
function verifyWebhookSignature(rawBody: string, signature: string) {
    const computedHash = crypto.createHmac('sha512', MONNIFY_CLIENT_SECRET)
        .update(rawBody)
        .digest('hex');
    return computedHash === signature;
}

export async function POST(request: NextRequest) {
    console.log("[Webhook] Action: Received webhook");
    try {
        console.log("[Webhook] Action: Connecting to database - Starting");
        await connectServer();
        console.log("[Webhook] Action: Connecting to database - Completed");

        // Get raw body for signature verification
        const rawBody = await request.text();
        const signature = request.headers.get('monnify-signature') || '';

        console.log("[Webhook] Action: Verifying signature - Starting");
        if (!verifyWebhookSignature(rawBody, signature)) {
            console.log("[Webhook] Action: Verifying signature - Failed");
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }
        console.log("[Webhook] Action: Verifying signature - Completed");

        // Parse the JSON body after signature check
        const body = JSON.parse(rawBody);
        const { eventType, eventData } = body;

        // Only proceed for successful reserved account funding
        if (
            eventType === 'SUCCESSFUL_TRANSACTION' &&
            eventData.product?.type === 'RESERVED_ACCOUNT'
        ) {
            console.log("[Webhook] Action: Processing reserved account funding - Starting");
            const accountReference = eventData.product.reference;
            const amountPaid = eventData.amountPaid;
            const paymentReference = eventData.paymentReference;
            const paidOn = eventData.paidOn;

            if (!accountReference || !amountPaid) {
                console.log("[Webhook] Action: Processing reserved account funding - Failed (Invalid payload)");
                return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
            }

            console.log("[Webhook] Action: Checking for duplicate transaction - Starting");
            const duplicate = await Transaction.findOne({ reference: paymentReference });
            if (duplicate) {
                console.log("[Webhook] Action: Checking for duplicate transaction - Completed (Duplicate found)");
                return NextResponse.json({ message: 'Duplicate transaction found' }, { status: 200 });
            }
            console.log("[Webhook] Action: Checking for duplicate transaction - Completed (No duplicate)");

            console.log("[Webhook] Action: Fetching user - Starting");
            const user = await User.findById(accountReference);
            if (!user) {
                console.log("[Webhook] Action: Fetching user - Failed (User not found)");
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }
            console.log("[Webhook] Action: Fetching user - Completed");

            const netAmount = Number(amountPaid) - SERVICE_FEE;
            if (netAmount < 0) {
                console.log("[Webhook] Action: Calculating net amount - Failed (Amount less than service fee)");
                return NextResponse.json({ error: 'Amount paid is less than service fee' }, { status: 400 });
            }

            user.balance = (user.balance || 0) + netAmount;

            // Convert paidOn to a JS Date object
            const createdAt = paidOn ? new Date(paidOn.replace('.0', '')) : new Date();

            console.log("[Webhook] Action: Creating deposit transaction - Starting");
            await Transaction.create({
                userId: user._id,
                type: 'deposit',
                amount: Number(amountPaid),
                status: 'success',
                reference: paymentReference,
                description: `Monnify reserved account funding (service fee: ${SERVICE_FEE})`,
                createdAt,
            });
            console.log("[Webhook] Action: Creating deposit transaction - Completed");

            console.log("[Webhook] Action: Creating service fee transaction - Starting");
            await Transaction.create({
                userId: user._id,
                type: 'service_fee',
                amount: SERVICE_FEE,
                status: 'success',
                reference: paymentReference + '-fee',
                description: 'Service fee deducted from deposit',
                createdAt,
            });
            console.log("[Webhook] Action: Creating service fee transaction - Completed");

            if (!user.firstDeposit) {
                console.log("[Webhook] Action: Distributing referral rewards - Starting");
                await calculateAndDistributeReferralRewards(user._id, netAmount);
                user.firstDeposit = true;
                console.log("[Webhook] Action: Distributing referral rewards - Completed");
            }

            console.log("[Webhook] Action: Saving user - Starting");
            await user.save();
            console.log("[Webhook] Action: Saving user - Completed");

            console.log("[Webhook] Action: Processing reserved account funding - Completed");
            return NextResponse.json({ message: 'Reserved account funding processed, service fee deducted' }, { status: 200 });
        }

        console.log(`[Webhook] Action: Event ${eventType} ignored - Completed`);
        return NextResponse.json({ message: `Event ${eventType} ignored` }, { status: 200 });
    } catch (error) {
        console.error('[Webhook] Action: Failed with error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}