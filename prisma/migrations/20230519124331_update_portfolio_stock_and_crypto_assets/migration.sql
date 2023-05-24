/*
  Warnings:

  - You are about to drop the column `shares` on the `StockAsset` table. All the data in the column will be lost.
  - Added the required column `name` to the `CryptoAsset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticker` to the `CryptoAsset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CryptoAsset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `StockAsset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `index` to the `StockAsset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `StockAsset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticker` to the `StockAsset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `StockAsset` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Portfolio_userId_key";

-- AlterTable
ALTER TABLE "CryptoAsset" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "ticker" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "StockAsset" DROP COLUMN "shares",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "index" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "ticker" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
