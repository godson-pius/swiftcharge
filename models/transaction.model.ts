import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
    userId: mongoose.Types.ObjectId;
    type: 'deposit' | 'withdrawal' | 'payment' | 'service_fee' | 'referral_rewards';
    amount: number;
    status: 'success' | 'failed' | 'pending';
    reference: string; // Unique transaction reference
    description?: string; // Optional description for auditing
    billId?: mongoose.Types.ObjectId | null; // Reference to a BillPayment, default is null
    createdAt: Date;
    updatedAt: Date;
}

const TransactionSchema: Schema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        type: { type: String, enum: ['deposit', 'withdrawal', 'payment', 'referral_reward', 'service_fee'], required: true },
        amount: { type: Number, required: true },
        status: { type: String, enum: ['success', 'failed', 'pending'], default: 'pending' },
        reference: { type: String, unique: true, required: true }, // Ensures unique transaction tracking
        description: { type: String }, // Optional field for additional details
        billId: { type: mongoose.Types.ObjectId, ref: 'Bill', default: null }, // Links to a BillPayment if applicable
    },
    { timestamps: true }
);

export const Transaction = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);