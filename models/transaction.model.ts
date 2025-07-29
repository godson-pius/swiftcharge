import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
    userId: mongoose.Types.ObjectId;
    type: 'deposit' | 'withdrawal' | 'payment' | 'service_fee' | 'referral_reward';
    amount: number;
    status: 'success' | 'failed' | 'pending';
    reference: string; // Unique transaction reference
    description?: string; // Optional description for auditing
    bill?: {
        type: 'airtime' | 'data' | 'electricity' | 'tv'; // Type of bill
        provider: string; // Service provider name, e.g., MTN, Airtel
        accountNumber?: string;
        metaData?: {
            [key: string]: any;
        };
    } | null;
    createdAt: Date;
    updatedAt: Date;
}

const TransactionSchema: Schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        type: { type: String, enum: ['deposit', 'withdrawal', 'payment', 'referral_reward', 'service_fee'], required: true },
        amount: { type: Number, required: true },
        status: { type: String, enum: ['success', 'failed', 'pending'], default: 'pending' },
        reference: { type: String, unique: true, required: true }, // Ensures unique transaction tracking
        description: { type: String }, // Optional field for additional details
        bill: { 
            type: {
                type: String,
                enum: ['airtime', 'data', 'electricity', 'tv'],
            },
            provider: { type: String },
            accountNumber: { type: String },
            metaData: { type: Schema.Types.Mixed },
         }, 
    },
    { timestamps: true }
);

export const Transaction = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);