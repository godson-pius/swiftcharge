import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    fullname?: string;
    username: string;
    email: string;
    phone?: string;
    address?: string;
    password: string;
    refId: string; 
    parentId?: string | null; 
    isActive: boolean; 
    lastLogin: Date;
    emailVerified: boolean;
    role: 'user' | 'admin'; 
    balance: number;
    accounts: Array<{ bankCode: string; accountNumber: string; bankName: string; accountName: string; }>;
    firstDeposit: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema(
    {
        fullname: { type: String, required: [true, 'Fullname is required'] },
        username: { type: String, required: [true, 'Username is required'], unique: true, lowercase: true },
        email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true },
        phone: { type: String, unique: true },
        address: { type: String},
        password: { type: String, required: [true, 'Password is required'] },
        refId: { type: String, required: true, unique: true }, 
        parentId: { type: String, default: null }, 
        isActive: { type: Boolean, default: true }, 
        role: { type: String, enum: ['user', 'admin'], default: 'user' }, 
        balance: { type: Number, default: 0 },
        firstDeposit: { type: Boolean, default: false },
        lastLogin: { type: Date, default: null },
        accounts: [
            {
                bankCode: { type: String },
                accountNumber: { type: String, unique: true },
                bankName: { type: String },
                accountName: { type: String },
            }
        ]
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};


userSchema.index(
  { phone: 1 },
  { unique: true, partialFilterExpression: { phone: { $type: "string", $ne: null } } }
);

let User: any;
try {
    User = mongoose.model<IUser>('User');
} catch {
    User = mongoose.model<IUser>('User', userSchema);
}

export default User;