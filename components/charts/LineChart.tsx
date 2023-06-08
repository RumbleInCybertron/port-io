"use client"

import { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

import { Line } from "react-chartjs-2";

type DataProps = {
  labels: string[];
  datasets: { data: number[] }[];
}

export function LineChart(data: DataProps) {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 2,
        borderColor: "rgba(47,97,68,1)",
        fill: "start",
        backgroundColor: "rgba(47,97,68,0.3)",
      },
    },
    scales: {
      xAxis: {
        display: false,
      },
      yAxis: {
        display: false,
      }
    }
  };

  return (
    <>
      {/* line chart */}
      <h1 className="w-[110px] mx-auto mt-10 text-xl font-semibold capitalize ">ラインチャート</h1>
      <Line data={data} width={100} height={40} options={options} />
    </>
  );
}