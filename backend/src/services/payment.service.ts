import crypto from "crypto";
import { prisma } from "../config/db.config";
import razorpay from "../config/razorpay";

export const createOrderService = async (videoId: string, userId: string) => {
  if (!videoId || !userId) {
    throw new Error("videoId and userId are required");
  }

  const video = await prisma.video.findUnique({
    where: { id: videoId },
  });

  if (!video) throw new Error("Video not found");

  if (video.type !== "PREMIUM") {
    throw new Error("This video is free");
  }

  const existingPurchase = await prisma.purchase.findFirst({
    where: {
      userId,
      videoId,
      status: "SUCCESS",
    },
  });

  if (existingPurchase) {
    throw new Error("Video already purchased");
  }

  const order = await razorpay.orders.create({
    amount: video.price * 100,
    currency: "INR",
    receipt: crypto.randomBytes(10).toString("hex"),
  });

  const purchase = await prisma.purchase.create({
    data: {
      userId,
      amount: video.price,
      razorpayOrderId: order.id,
      videoId: video.id,
    },
  });

  return {
    order,
    purchase,
  };
};

export const verifyPaymentService = async (
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string,
) => {
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new Error("All fields are required");
  }

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    throw new Error("Invalid payment signature");
  }

  // 🚨 STEP 1: fetch purchase first
  const existingPurchase = await prisma.purchase.findUnique({
    where: {
      razorpayOrderId: razorpay_order_id,
    },
    include: {
      user: true,
      video: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  if (!existingPurchase) {
    throw new Error("Purchase not found");
  }

  // 🚨 STEP 2: IDENTITY CHECK (THIS IS WHAT YOU ASKED)
  if (existingPurchase.status === "SUCCESS") {
    return existingPurchase; // already processed → STOP HERE
  }

  // 🚨 STEP 3: update only if not processed
  const purchase = await prisma.purchase.update({
    where: {
      razorpayOrderId: razorpay_order_id,
    },
    data: {
      razorpayPaymentId: razorpay_payment_id,
      status: "SUCCESS",
    },
    include: {
      user: true,
      video: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  return purchase;
};

export const getUserPurchasesService = async (userId: string) => {
  return prisma.purchase.findMany({
    where: {
      userId,
      status: "SUCCESS",
    },

    include: {
      video: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getPurchaseByVideoService = async (
  userId: string,
  videoId: string,
) => {
  const purchase = await prisma.purchase.findFirst({
    where: {
      userId,
      videoId,
      status: "SUCCESS",
    },
  });

  return {
    purchased: !!purchase,
  };
};

export const getAllPaymentsService = async () => {
  return prisma.purchase.findMany({
    include: {
      video: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getPaymentDetailsService = async (purchaseId: string) => {
  const payment = await prisma.purchase.findUnique({
    where: {
      id: purchaseId,
    },

    include: {
      video: true,
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  return payment;
};

export const handlePaymentFailedService = async (purchaseId: string) => {
  return prisma.purchase.update({
    where: {
      id: purchaseId,
    },

    data: {
      status: "FAILED",
    },
  });
};

export const refundPaymentService = async (purchaseId: string) => {
  const purchase = await prisma.purchase.findUnique({
    where: {
      id: purchaseId,
    },
  });

  if (!purchase) {
    throw new Error("Purchase not found");
  }

  if (!purchase.razorpayPaymentId) {
    throw new Error("Payment id not found");
  }

  const refund = await razorpay.payments.refund(purchase.razorpayPaymentId, {
    amount: purchase.amount * 100,
  });

  await prisma.purchase.update({
    where: {
      id: purchaseId,
    },

    data: {
      status: "FAILED",
    },
  });

  return refund;
};
