import express from "express"
import { loginAdmin } from "../controllers/admin.controller";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);