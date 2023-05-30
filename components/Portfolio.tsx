import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';

export type PortfolioProps = {
  id: string;
  name: string;
};

export const Portfolio = ({ ...portfolio }: PortfolioProps) => {
  return (
    <div onClick={() =>
      Router.push({
        pathname: '/portfolio',
        query: { id: portfolio.id },
      })
    }>
      <small>{portfolio.name}</small>
      <ReactMarkdown>{portfolio.name}</ReactMarkdown>
    </div>
  )
}

export default Portfolio;