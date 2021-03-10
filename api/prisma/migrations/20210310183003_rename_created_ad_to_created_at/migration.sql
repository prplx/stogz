/*
  Warnings:

  - You are about to drop the column `createdAd` on the `deals` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "deals" DROP COLUMN "createdAd",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
