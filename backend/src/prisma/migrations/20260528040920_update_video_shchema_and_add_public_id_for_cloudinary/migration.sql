/*
  Warnings:

  - Added the required column `thumbnailPublicId` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoPublicId` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Video_genre_idx";

-- DropIndex
DROP INDEX "Video_title_idx";

-- DropIndex
DROP INDEX "Video_type_idx";

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "bannerPublicId" TEXT,
ADD COLUMN     "thumbnailPublicId" TEXT NOT NULL,
ADD COLUMN     "trailerPublicId" TEXT,
ADD COLUMN     "videoPublicId" TEXT NOT NULL;
