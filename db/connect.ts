import mongoose from "mongoose"

export const connectDB = async (uri:string | any) => {
    mongoose.connect(uri);
}