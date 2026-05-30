/*
  Warnings:

  - You are about to drop the column `email` on the `Purchase` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Purchase_email_idx";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "email",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Purchase_userId_idx" ON "Purchase"("userId");

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
