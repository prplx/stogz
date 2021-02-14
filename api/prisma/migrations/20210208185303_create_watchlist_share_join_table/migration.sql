/*
  Warnings:

  - You are about to drop the `_ShareToWatchlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ShareToWatchlist" DROP CONSTRAINT "_ShareToWatchlist_A_fkey";

-- DropForeignKey
ALTER TABLE "_ShareToWatchlist" DROP CONSTRAINT "_ShareToWatchlist_B_fkey";

-- CreateTable
CREATE TABLE "WatchlistShares" (
    "shareId" INTEGER NOT NULL,
    "watchlistId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" DECIMAL(65,30) NOT NULL,

    PRIMARY KEY ("shareId","watchlistId")
);

-- DropTable
DROP TABLE "_ShareToWatchlist";

-- AddForeignKey
ALTER TABLE "WatchlistShares" ADD FOREIGN KEY ("shareId") REFERENCES "shares"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchlistShares" ADD FOREIGN KEY ("watchlistId") REFERENCES "watchlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
