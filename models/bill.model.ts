import mongoose, { Schema, Document } from 'mongoose';

export interface IBill extends Document {
    userId: mongoose.Types.ObjectId;
    type: 'airtime' | 'data' | 'electricity';
    provider: string; // E.g., MTN, Airtel, PHCN
    accountNumber?: string; // Optional for services like electricity
    transactionId: mongoose.Types.ObjectId; // Links to the Transaction model
    metaData: {};
    createdAt: Date;
    updatedAt: Date;
}

const BillSchema: Schema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        type: { type: String, enum: ['airtime', 'data', 'electricity'], required: true },
        provider: { type: String, required: true }, // E.g., service provider name
        accountNumber: { type: String }, // Optional for services like electricity
        metaData: { type: Object }, // Additional metadata for the bill
        transactionId: { type: mongoose.Types.ObjectId, ref: 'Transaction', required: true }, // Links to the transaction
    },
    { timestamps: true }
);

export const Bill = mongoose.model<IBill>('Bill', BillSchema);