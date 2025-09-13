import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path, { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { userRouter } from "./routes/User.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CORS setup
app.use(
    cors({
        origin: ["http://localhost:3000", process.env.FRONTEND_URL],
        credentials: true,
    })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// API routes
app.use("/api/v1", userRouter);

app.use(express.static(resolve(__dirname, "../frontend/dist")));

app.get(/.*/, (req, res) => {
    res.sendFile(resolve(__dirname, "../frontend/dist/index.html"));
});

export default app;
