import { Request, Response } from "express";

import response from "../utils/resHandler";
import { sendPaymentSuccessEmail } from "../services/email.service";
import {
  createOrderService,
  verifyPaymentService,
  getUserPurchasesService,
  getPurchaseByVideoService,
  getAllPaymentsService,
  getPaymentDetailsService,
  handlePaymentFailedService,
  refundPaymentService,
} from "../services/payment.service";
import { adminNamespace, userNamespace } from "../sockets/socket.handler";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.body;
    if (!req.user.id) return response(res, 401, "you are not autheticated");
    const data = await createOrderService(videoId, req.user.id);

    return response(res, 201, "Order created successfully", data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response(res, 500, error.message);
    }

    return response(res, 500, "Server Error");
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const data = await verifyPaymentService(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    );

    // send payment success email
    await sendPaymentSuccessEmail({
      email: data.user?.email,
      name: data.user?.name || "user",
      amount: data.amount,
      transactionId: razorpay_payment_id,
      videoTitle: data.video?.title || "Premium Video",
    });

    adminNamespace.emit("new_payment", data);
    userNamespace
      .to(`user:${data.user.id}`)
      .emit("payment_success", {
        videoId: data.video.id,
        title: data.video.title,
      });
    return response(res, 200, "Payment verified successfully", data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response(res, 500, error.message);
    }

    return response(res, 500, "Server Error");
  }
};

export const getUserPurchases = async (req: Request, res: Response) => {
  try {
    if (!req.user.id) return response(res, 401, "you are not autheticated");

    const data = await getUserPurchasesService(req.user.id);

    return response(res, 200, "User purchases fetched successfully", data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response(res, 500, error.message);
    }

    return response(res, 500, "Server Error");
  }
};

export const getPurchaseByVideo = async (req: Request, res: Response) => {
  try {
    if (!req.user.id) return response(res, 401, "you are not autheticated");

    const { videoId } = req.params;

    const data = await getPurchaseByVideoService(
      req.user.id,
      videoId as string,
    );

    return response(res, 200, "Purchase status fetched successfully", data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response(res, 500, error.message);
    }

    return response(res, 500, "Server Error");
  }
};

export const getAllPayments = async (req: Request, res: Response) => {
  try {
    const data = await getAllPaymentsService();

    return response(res, 200, "Payments fetched successfully", data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response(res, 500, error.message);
    }

    return response(res, 500, "Server Error");
  }
};

export const getPaymentDetails = async (req: Request, res: Response) => {
  try {
    const { purchaseId } = req.params;

    const data = await getPaymentDetailsService(purchaseId as string);

    return response(res, 200, "Payment details fetched successfully", data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response(res, 500, error.message);
    }

    return response(res, 500, "Server Error");
  }
};

export const handlePaymentFailed = async (req: Request, res: Response) => {
  try {
    const { purchaseId } = req.params;

    const data = await handlePaymentFailedService(purchaseId as string);

    return response(res, 200, "Payment marked as failed", data);
  } catch (error: any) {
    return response(res, 500, error.message || "Server Error");
  }
};

export const refundPayment = async (req: Request, res: Response) => {
  try {
    const { purchaseId } = req.params;

    const data = await refundPaymentService(purchaseId as string);

    return response(res, 200, "Refund processed successfully", data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response(res, 500, error.message);
    }

    return response(res, 500, "Server Error");
  }
};
