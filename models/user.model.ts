import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: ['Fullname is required'] },
    username: { type: String, required: ['Username is required'] },
    email: { type: String, required: ['Email is required'] },
    phone: { type: String, required: ['Phone number is required'] },
    address: { type: String, required: ['Address number is required'] },
    password: { type: String, required: ['Password is required'] },
    refId: { type: String, default: null }

}, { timestamps: true })

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;