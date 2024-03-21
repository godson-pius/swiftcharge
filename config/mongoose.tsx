import mongoose from "mongoose";

const connectServer = () => {
    try {
        mongoose.connect(`${process.env.MONGODBURI}`);
        console.log("Connected")
    } catch (error) {
        console.log(error)
    }
}

export default connectServer