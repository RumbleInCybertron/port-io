"use client"

import "@/app/styles/globals.css"

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

import { Doughnut } from "react-chartjs-2";

type DataProps = {
  labels: string[];
  datasets: {}[];
  width: number;
  height: number;
}

export function Breakdown() {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
      },
    },
  }

  const data2 = {
  height: 100,
  width: 100,
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

  return (
    <>
      <div className="container relative h-96 w-96 bg-gradient-to-r from orange-400 to-blue-500 via-purple-500 animate-gradient-x">
        <div className="w-[150px] mx-auto mt-10 text-xl">Portfolios Breakdown</div>
        <Doughnut data={data2} width={data2.width} height={data2.height} options={options} />
      </div>
    </>
  )
}