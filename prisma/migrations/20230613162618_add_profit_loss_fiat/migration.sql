/*
  Warnings:

  - You are about to drop the column `ticker` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `CryptoAsset` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `StockAsset` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "ticker",
DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "Profit" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cryptoAssetId" TEXT,
    "stockAssetId" TEXT,

    CONSTRAINT "Profit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loss" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cryptoAssetId" TEXT,
    "stockAssetId" TEXT,

    CONSTRAINT "Loss_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fiat" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "portfolioId" TEXT NOT NULL,

    CONSTRAINT "Fiat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fiat_portfolioId_key" ON "Fiat"("portfolioId");

-- CreateIndex
CREATE UNIQUE INDEX "CryptoAsset_name_key" ON "CryptoAsset"("name");

-- CreateIndex
CREATE UNIQUE INDEX "StockAsset_name_key" ON "StockAsset"("name");

-- AddForeignKey
ALTER TABLE "Profit" ADD CONSTRAINT "Profit_cryptoAssetId_fkey" FOREIGN KEY ("cryptoAssetId") REFERENCES "CryptoAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profit" ADD CONSTRAINT "Profit_stockAssetId_fkey" FOREIGN KEY ("stockAssetId") REFERENCES "StockAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loss" ADD CONSTRAINT "Loss_cryptoAssetId_fkey" FOREIGN KEY ("cryptoAssetId") REFERENCES "CryptoAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loss" ADD CONSTRAINT "Loss_stockAssetId_fkey" FOREIGN KEY ("stockAssetId") REFERENCES "StockAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fiat" ADD CONSTRAINT "Fiat_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
