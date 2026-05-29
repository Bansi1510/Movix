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

const router = Router();

router.post("/create-order", createOrder);

router.post("/verify", verifyPayment);

router.get("/my-purchases", isLoggedInUser, getUserPurchases);

router.get("/check/:videoId", isLoggedInUser, getPurchaseByVideo);

router.get("/:purchaseId", isLoggedInUser, getPaymentDetails);

router.get("/admin/all", isAdmin, getAllPayments);

router.patch("/failed/:purchaseId", handlePaymentFailed);

router.post("/refund/:purchaseId", isAdmin, refundPayment);

export default router;
