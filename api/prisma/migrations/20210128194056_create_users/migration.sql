-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sub" TEXT NOT NULL,
    "email" TEXT,
    "givenName" TEXT,
    "familyName" TEXT,
    "picture" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.sub_unique" ON "User"("sub");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
