import mongoose, { Schema, Document } from "mongoose";

export interface IReferral extends Document {
    userId: mongoose.Types.ObjectId;
    referrerId: mongoose.Types.ObjectId;
    generation: number; // 1-7 for tracking generation level
    amount: number;
    createdAt: Date;
    updatedAt: Date;
}

const referralSchema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        referrerId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        generation: { type: Number, required: true, min: 1, max: 7 },
        amount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

// Index for efficient querying
referralSchema.index({ referrerId: 1, generation: 1 });
referralSchema.index({ userId: 1 });

const Referral = mongoose.models.Referral || mongoose.model<IReferral>('Referral', referralSchema);
export default Referral;