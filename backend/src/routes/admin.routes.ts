import express from "express"
import { checkAuthController, generateUserInsightController, getAdminProfile, loginAdmin, logoutAdminController } from "../controllers/admin.controller";
import isAdmin from "../middlewares/isAdmin";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.get("/check-auth", isAdmin, checkAuthController);

adminRouter.get("/:id", getAdminProfile);
adminRouter.post("/insights/:userId", isAdmin, generateUserInsightController);
adminRouter.post(
  "/logout",
  logoutAdminController
);




export default adminRouter;