import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import connectServer from '@/config/mongoose';
import User from '@/models/user.model';
import { Transaction } from '@/models/transaction.model';
import crypto from 'crypto';

const SERVICE_FEE = 100;
const MONNIFY_CLIENT_SECRET = process.env.MONIFY_API_SECRET!;

// Helper to verify Monnify signature
function verifyWebhookSignature(rawBody: string, signature: string) {
    const computedHash = crypto.createHmac('sha512', MONNIFY_CLIENT_SECRET)
        .update(rawBody)
        .digest('hex');
    return computedHash === signature;
}

export async function POST(request: NextRequest) {
    console.log("received webhook");
    try {
        await connectServer();

        // Get raw body for signature verification
        const rawBody = await request.text();
        const signature = request.headers.get('monnify-signature') || '';

        if (!verifyWebhookSignature(rawBody, signature)) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }

        // Parse the JSON body after signature check
        const body = JSON.parse(rawBody);
        const { eventType, eventData } = body;


        // Only proceed for successful reserved account funding
        if (
            eventType === 'SUCCESSFUL_TRANSACTION' &&
            eventData.product?.type === 'RESERVED_ACCOUNT'
        ) {
            const accountReference = eventData.product.reference;
            const amountPaid = eventData.amountPaid;
            const paymentReference = eventData.paymentReference;
            const paidOn = eventData.paidOn; // e.g. "2025-07-09 19:40:25.0"

            if (!accountReference || !amountPaid) {
                return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
            }

            // Check for duplicate transaction
            const duplicate = await Transaction.findOne({ reference: paymentReference });
            if (duplicate) {
                return NextResponse.json({ message: 'Duplicate transaction found' }, { status: 200 });
            }

            const user = await User.findById(accountReference);
            if (!user) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }

            const netAmount = Number(amountPaid) - SERVICE_FEE;
            if (netAmount < 0) {
                return NextResponse.json({ error: 'Amount paid is less than service fee' }, { status: 400 });
            }

            user.balance = (user.balance || 0) + netAmount;
            await user.save();

            // Convert paidOn to a JS Date object
            const createdAt = paidOn ? new Date(paidOn.replace('.0', '')) : new Date();

            await Transaction.create({
                userId: user._id,
                type: 'deposit',
                amount: Number(amountPaid),
                status: 'success',
                reference: paymentReference,
                description: `Monnify reserved account funding (service fee: ${SERVICE_FEE})`,
                createdAt,
            });

            await Transaction.create({
                userId: user._id,
                type: 'service_fee',
                amount: SERVICE_FEE,
                status: 'success',
                reference: paymentReference + '-fee',
                description: 'Service fee deducted from deposit',
                createdAt,
            });

            return NextResponse.json({ message: 'Reserved account funding processed, service fee deducted' }, { status: 200 });
        }

        // Ignore other events
        return NextResponse.json({ message: `Event ${eventType} ignored` }, { status: 200 });
    } catch (error) {
        console.error('Monnify webhook error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}