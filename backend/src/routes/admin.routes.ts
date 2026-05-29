import express from "express"
import { getAdminProfile, loginAdmin } from "../controllers/admin.controller";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.get("/:id", getAdminProfile);

export default adminRouter;