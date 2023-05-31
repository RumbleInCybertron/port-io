import React from 'react';
import { useRouter } from "next/navigation";
import ReactMarkdown from 'react-markdown';

export type PortfolioProps = {
  id: string;
  name: string;
};

export const Portfolio = ({ ...portfolio }: PortfolioProps) => {
  const router = useRouter();
  const uri = "/portfolio" + "?id=" + portfolio.id;

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