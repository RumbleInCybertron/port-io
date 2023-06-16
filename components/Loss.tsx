"use client"

export type LossProps = {
  id: string;
  amount: number;
  stockAssetId: string | null;
  cryptoAssetId: string | null;
}

export const Loss = ({ id, amount, stockAssetId, cryptoAssetId }: LossProps) => {
  return (
    <div className="text-inherit p-2">
      <small>Amount: ${amount}</small>
    </div>
  )
}