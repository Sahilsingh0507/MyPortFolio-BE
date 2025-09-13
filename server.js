import app from "./app.js";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";
import cloudinary from "cloudinary";

console.log("Loading environment variables...");
dotenv.config({ path: "./backend/config/config.env" });

const startServer = async () => {
    try {
        await connectDatabase();
        console.log("Database connected");

        cloudinary.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        const PORT = process.env.PORT || 4000;

        const server = app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

        server.on("error", (err) => {
            console.error("Server error:", err);
        });
    } catch (err) {
        console.error("Startup failed:", err);
        process.exit(1);
    }
};

startServer();
