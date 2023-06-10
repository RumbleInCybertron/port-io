import { CryptoAsset, StockAsset } from "@prisma/client";

export const createTransaction =  async (asset: StockAsset | CryptoAsset, assetType: string, transactionType: string, price: number) =>
  await prisma.transaction.create({
    data: {
      price: transactionType === "long" ? Number(price) : Number(-price),
      units: Number(asset.amount),
      type: assetType,
      stockAssetId: assetType === "stock" ? asset?.id : null,
      cryptoAssetId: assetType === "crypto" ? asset?.id : null,
    }
  });