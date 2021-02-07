/*
  Warnings:

  - Added the required column `type` to the `shares` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `shares` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `shares` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marketOpen` to the `shares` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marketClose` to the `shares` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timezone` to the `shares` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shares" ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "marketOpen" TEXT NOT NULL,
ADD COLUMN     "marketClose" TEXT NOT NULL,
ADD COLUMN     "timezone" TEXT NOT NULL;
