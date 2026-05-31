import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import "dotenv/config";
import adminRouter from "./routes/admin.routes";
import videoRouter from "./routes/video.routes";
import paymentRouter from "./routes/payment.routes";
import userRouter from "./routes/user.routes";

import errorMiddleware from "./middlewares/error.middleware";

import { initSocket } from "./config/socket.config";
import { registerSocketEvents } from "./sockets/socket.handler";

dotenv.config();

const app = express();

const server = http.createServer(app);

// initialize socket
const io = initSocket(server);

// register socket events
registerSocketEvents(io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/admin", adminRouter);
app.use("/api/video", videoRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/user", userRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});