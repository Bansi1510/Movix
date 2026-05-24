import express from "express";
import dotenv from "dotenv";
import { prisma } from "./config/db.config";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      message: "Server and Database working properly 🚀",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});