"use client"

export type ProfitProps = {
  id: string;
  amount: number;
  stockAssetId: string | null;
  cryptoAssetId: string | null;
}

export const Profit = ({ id, amount, stockAssetId, cryptoAssetId }: ProfitProps) => {
  return (
    <div className="text-inherit p-2">
      <small>Amount: ${amount.toFixed(2)}</small>
    </div>
  )
}