/*
  Warnings:

  - You are about to drop the `WatchlistShares` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WatchlistShares" DROP CONSTRAINT "WatchlistShares_shareId_fkey";

-- DropForeignKey
ALTER TABLE "WatchlistShares" DROP CONSTRAINT "WatchlistShares_watchlistId_fkey";

-- CreateTable
CREATE TABLE "watchlists_shares" (
    "shareId" INTEGER NOT NULL,
    "watchlistId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" DECIMAL(65,30) NOT NULL,

    PRIMARY KEY ("shareId","watchlistId")
);

-- DropTable
DROP TABLE "WatchlistShares";

-- AddForeignKey
ALTER TABLE "watchlists_shares" ADD FOREIGN KEY ("shareId") REFERENCES "shares"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlists_shares" ADD FOREIGN KEY ("watchlistId") REFERENCES "watchlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
