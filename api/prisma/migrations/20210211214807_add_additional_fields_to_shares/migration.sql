/*
  Warnings:

  - You are about to drop the column `region` on the `shares` table. All the data in the column will be lost.
  - Added the required column `assetType` to the `shares` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exchange` to the `shares` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `shares` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shares" DROP COLUMN "region",
ADD COLUMN     "assetType" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "exchange" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "sector" TEXT,
ADD COLUMN     "industry" TEXT,
ALTER COLUMN "marketOpen" DROP NOT NULL,
ALTER COLUMN "marketClose" DROP NOT NULL;
