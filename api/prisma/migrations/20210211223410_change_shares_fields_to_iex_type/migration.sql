/*
  Warnings:

  - You are about to drop the column `name` on the `shares` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `shares` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `shares` table. All the data in the column will be lost.
  - You are about to drop the column `marketOpen` on the `shares` table. All the data in the column will be lost.
  - You are about to drop the column `marketClose` on the `shares` table. All the data in the column will be lost.
  - You are about to drop the column `timezone` on the `shares` table. All the data in the column will be lost.
  - You are about to drop the column `assetType` on the `shares` table. All the data in the column will be lost.
  - Added the required column `companyName` to the `shares` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issueType` to the `shares` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `shares` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `sector` on table `shares` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `industry` on table `shares` required. The migration will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "shares.name_index";

-- AlterTable
ALTER TABLE "shares" DROP COLUMN "name",
DROP COLUMN "type",
DROP COLUMN "currency",
DROP COLUMN "marketOpen",
DROP COLUMN "marketClose",
DROP COLUMN "timezone",
DROP COLUMN "assetType",
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "issueType" TEXT NOT NULL,
ADD COLUMN     "website" TEXT,
ADD COLUMN     "logo" TEXT,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "sector" SET NOT NULL,
ALTER COLUMN "industry" SET NOT NULL;

-- CreateIndex
CREATE INDEX "shares.companyName_index" ON "shares"("companyName");
