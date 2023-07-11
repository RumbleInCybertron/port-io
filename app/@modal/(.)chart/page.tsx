import '@/app/styles/globals.css'
import Modal from "@/components/Modal";
import { Selector } from "@/components/Selector";

export default async function StockSelectPage() {
  const stocks = await prisma.stock.findMany({
    select: { name: true, ticker: true }
  });

  return (
    <Modal>
      <Selector {...stocks} />
    </Modal>
  );
}