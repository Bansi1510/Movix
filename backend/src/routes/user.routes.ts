import { Router } from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  logoutUserController,
} from "../controllers/user.controller";
import isLoggedInUser from "../middlewares/isLoggedInUser";

const userRouter = Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/profile", isLoggedInUser, getProfile);

userRouter.post("/logout", isLoggedInUser, logoutUserController);

export default userRouter;