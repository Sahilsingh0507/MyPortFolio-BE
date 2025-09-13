import mongoose from "mongoose";

export const connectDatabase = async () => {
    try {
        const c = await mongoose.connect(process.env.MONGO_URI, {});
        console.log(`MongoDB connected to: ${c.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};
