import React from 'react';
import { usePathname, useRouter } from "next/navigation";
import ReactMarkdown from 'react-markdown';

export type PortfolioProps = {
  id: string;
  name: string;
};

export const Portfolio = ({ ...portfolio }: PortfolioProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const uri = pathname! + "?id=" + portfolio.id;

  return (
    <div onClick={() =>
      router.push(uri)
    }>
      <small>{portfolio.name}</small>
      <ReactMarkdown>{portfolio.name}</ReactMarkdown>
    </div>
  )
}

export default Portfolio;