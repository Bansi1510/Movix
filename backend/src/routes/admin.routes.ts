import express from "express"
import { generateUserInsightController, getAdminProfile, loginAdmin } from "../controllers/admin.controller";
import isAdmin from "../middlewares/isAdmin";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.get("/:id", getAdminProfile);
adminRouter.post("/insights/:userId", isAdmin, generateUserInsightController);
export default adminRouter;