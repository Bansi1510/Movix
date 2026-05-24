-- CreateEnum
CREATE TYPE "VideoType" AS ENUM ('FREE', 'PREMIUM');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "Sentiment" AS ENUM ('POSITIVE', 'NEGATIVE', 'NEUTRAL');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "bannerImage" TEXT,
    "videoUrl" TEXT NOT NULL,
    "trailerUrl" TEXT,
    "genre" TEXT NOT NULL,
    "language" TEXT,
    "tags" TEXT[],
    "duration" INTEGER NOT NULL,
    "type" "VideoType" NOT NULL DEFAULT 'FREE',
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "hasAds" BOOLEAN NOT NULL DEFAULT true,
    "downloadable" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "uploadedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "razorpayOrderId" TEXT NOT NULL,
    "razorpayPaymentId" TEXT,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "videoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Analytics" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "totalWatchTime" INTEGER NOT NULL DEFAULT 0,
    "completionRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "sentiment" "Sentiment",
    "videoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "Video_title_idx" ON "Video"("title");

-- CreateIndex
CREATE INDEX "Video_genre_idx" ON "Video"("genre");

-- CreateIndex
CREATE INDEX "Video_type_idx" ON "Video"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_razorpayOrderId_key" ON "Purchase"("razorpayOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_razorpayPaymentId_key" ON "Purchase"("razorpayPaymentId");

-- CreateIndex
CREATE INDEX "Purchase_email_idx" ON "Purchase"("email");

-- CreateIndex
CREATE INDEX "Purchase_status_idx" ON "Purchase"("status");

-- CreateIndex
CREATE INDEX "Analytics_videoId_idx" ON "Analytics"("videoId");

-- CreateIndex
CREATE INDEX "Comment_videoId_idx" ON "Comment"("videoId");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
