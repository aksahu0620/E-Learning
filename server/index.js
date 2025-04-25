import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connect } from "mongoose";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js"
import courseRoute from "./routes/course.route.js"
import mediaRoute from "./routes/media.route.js"
import purchaseRoute from "./routes/purchaseCourse.route.js"
import courseProgressRoute from "./routes/courseProgress.route.js"

dotenv.config();

// calling database connection here
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;


const allowedOrigins = [
    "http://localhost:5173",
    "https://e-learning-three-puce.vercel.app/",
    "https://e-learning-git-main-akshay-kumar-sahus-projects.vercel.app/",
    "https://e-learning-qp8by0773-akshay-kumar-sahus-projects.vercel.app/"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

// default middleware
app.use(express.json());
app.use(cookieParser());

// APIs
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})