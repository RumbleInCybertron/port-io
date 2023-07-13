import '@/app/styles/globals.css'
import Modal from "@/components/Modal";
import { Selector } from "@/components/Selector";
import Link from 'next/link';

export default async function StockSelectPage() {
  const stocks = await prisma.stock.findMany({
    select: { ticker: true }
  });

  return (
    <Modal>
      <Selector {...stocks} />
      {/*TODO: Links do not work for now the interceptor doesn't unmount and doesn't relinquish up control}
      {/*<Link href="stock/NVDA" replace><span>Go!</span></Link>*/}
    </Modal>
  );
}