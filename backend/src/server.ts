import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { prisma } from "./config/db.config";
import cookieParser from "cookie-parser";
import adminRouter from "./routes/admin.routes";
import videoRouter from "./routes/video.routes";
import paymentRouter from "./routes/payment.routes";
import errorMiddleware from "./middlewares/error.middleware";
import userRouter from "./routes/user.routes";

dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use("/api/admin", adminRouter);
app.use("/api/video", videoRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/user", userRouter);


app.use(errorMiddleware);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});