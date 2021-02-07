/*
  Warnings:

  - You are about to drop the `Share` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Watchlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Watchlist" DROP CONSTRAINT "Watchlist_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ShareToWatchlist" DROP CONSTRAINT "_ShareToWatchlist_A_fkey";

-- DropForeignKey
ALTER TABLE "_ShareToWatchlist" DROP CONSTRAINT "_ShareToWatchlist_B_fkey";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sub" TEXT NOT NULL,
    "email" TEXT,
    "givenName" TEXT,
    "familyName" TEXT,
    "picture" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shares" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "watchlists" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- DropTable
DROP TABLE "Share";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Watchlist";

-- CreateIndex
CREATE UNIQUE INDEX "users.sub_unique" ON "users"("sub");

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE INDEX "users.sub_index" ON "users"("sub");

-- CreateIndex
CREATE INDEX "users.email_index" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "shares.symbol_unique" ON "shares"("symbol");

-- CreateIndex
CREATE INDEX "shares.name_index" ON "shares"("name");

-- CreateIndex
CREATE INDEX "shares.symbol_index" ON "shares"("symbol");

-- AddForeignKey
ALTER TABLE "watchlists" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShareToWatchlist" ADD FOREIGN KEY ("A") REFERENCES "shares"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShareToWatchlist" ADD FOREIGN KEY ("B") REFERENCES "watchlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
