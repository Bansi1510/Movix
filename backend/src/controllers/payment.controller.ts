import { Request, Response } from "express";
import crypto from "crypto";
import response from "../utils/resHandler";
import { prisma } from "../config/db.config";
import razorpay from "../config/razorpay";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { videoId, email } = req.body;

    // check required fields
    if (!videoId || !email) {
      return response(res, 400, "videoId and email are required");
    }

    // find video
    const video = await prisma.video.findUnique({
      where: {
        id: videoId,
      },
    });

    // check video exists
    if (!video) {
      return response(res, 404, "Video not found");
    }

    // check premium video
    if (video.type !== "PREMIUM") {
      return response(res, 400, "This video is free");
    }

    // check already purchased
    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        email,
        videoId,
        status: "SUCCESS",
      },
    });

    if (existingPurchase) {
      return response(res, 400, "Video already purchased");
    }

    // create razorpay order
    const order = await razorpay.orders.create({
      amount: video.price * 100, // paisa
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    });

    // save purchase
    const purchase = await prisma.purchase.create({
      data: {
        email,
        amount: video.price,
        razorpayOrderId: order.id,
        videoId: video.id,
      },
    });

    return response(res, 201, "Order created successfully", {
      order,
      purchase,
    });
  } catch (error) {
    console.log(error);

    return response(res, 500, "Server Error");
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // check required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return response(res, 400, "All fields are required");
    }

    // create generated signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    // verify signature
    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return response(res, 400, "Invalid payment signature");
    }

    // update purchase
    const purchase = await prisma.purchase.update({
      where: {
        razorpayOrderId: razorpay_order_id,
      },
      data: {
        razorpayPaymentId: razorpay_payment_id,
        status: "SUCCESS",
      },
    });

    return response(res, 200, "Payment verified successfully", purchase);
  } catch (error) {
    console.log(error);

    return response(res, 500, "Server Error");
  }
};

export const getUserPurchases = async (req: Request, res: Response) => {
  try {
    const email = req.user.email;

    // get all successful purchases
    const purchases = await prisma.purchase.findMany({
      where: {
        email,
        status: "SUCCESS",
      },

      include: {
        video: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return response(res, 200, "User purchases fetched successfully", purchases);
  } catch (error) {
    console.log(error);

    return response(res, 500, "Server Error");
  }
};

export const getPurchaseByVideo = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;
    const vid = videoId as string
    const email = req.user.email;

    const purchase = await prisma.purchase.findFirst({
      where: {
        email,
        videoId: vid,
        status: "SUCCESS",
      },
    });

    return response(res, 200, "Purchase status fetched successfully", {
      purchased: !!purchase,
    });
  } catch (error) {
    console.log(error);

    return response(res, 500, "Server Error");
  }
};

export const getAllPayments = async (req: Request, res: Response) => {
  try {
    const payments = await prisma.purchase.findMany({
      include: {
        video: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return response(res, 200, "Payments fetched successfully", payments);
  } catch (error) {
    console.log(error);

    return response(res, 500, "Server Error");
  }
};

export const getPaymentDetails = async (req: Request, res: Response) => {
  try {
    const { purchaseId } = req.params;
    const pId = purchaseId as string
    const payment = await prisma.purchase.findUnique({
      where: {
        id: pId,
      },

      include: {
        video: true,
      },
    });

    if (!payment) {
      return response(res, 404, "Payment not found");
    }

    return response(res, 200, "Payment details fetched successfully", payment);
  } catch (error) {
    console.log(error);

    return response(res, 500, "Server Error");
  }
};

export const handlePaymentFailed = async (req: Request, res: Response) => {
  try {
    const { purchaseId } = req.params;
    const pId = purchaseId as string;
    const purchase = await prisma.purchase.update({
      where: {
        id: pId,
      },

      data: {
        status: "FAILED",
      },
    });

    return response(res, 200, "Payment marked as failed", purchase);
  } catch (error) {
    console.log(error);

    return response(res, 500, "Server Error");
  }
};

export const refundPayment = async (req: Request, res: Response) => {
  try {
    const { purchaseId } = req.params;
    const pId = purchaseId as string;
    const purchase = await prisma.purchase.findUnique({
      where: {
        id: pId,
      },
    });

    if (!purchase) {
      return response(res, 404, "Purchase not found");
    }

    if (!purchase.razorpayPaymentId) {
      return response(res, 400, "Payment id not found");
    }

    // create refund
    const refund = await razorpay.payments.refund(purchase.razorpayPaymentId, {
      amount: purchase.amount * 100,
    });

    // update status
    await prisma.purchase.update({
      where: {
        id: pId,
      },

      data: {
        status: "FAILED",
      },
    });

    return response(res, 200, "Refund processed successfully", refund);
  } catch (error) {
    console.log(error);

    return response(res, 500, "Server Error");
  }
};
