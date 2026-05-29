import { Router } from "express";

import {
  createOrder,
  verifyPayment,
  getUserPurchases,
  getPurchaseByVideo,
  getAllPayments,
  getPaymentDetails,
  handlePaymentFailed,
  refundPayment,
} from "../controllers/payment.controller";
import isLoggedInUser from "../middlewares/isLoggedInUser";
import isAdmin from "../middlewares/isAdmin";

const paymentRouter = Router();

paymentRouter.post("/create-order", createOrder);

paymentRouter.post("/verify", verifyPayment);

paymentRouter.get("/my-purchases", isLoggedInUser, getUserPurchases);

paymentRouter.get("/check/:videoId", isLoggedInUser, getPurchaseByVideo);

paymentRouter.get("/:purchaseId", isLoggedInUser, getPaymentDetails);

paymentRouter.get("/admin/all", isAdmin, getAllPayments);

paymentRouter.patch("/failed/:purchaseId", handlePaymentFailed);

paymentRouter.post("/refund/:purchaseId", isAdmin, refundPayment);

export default paymentRouter;
