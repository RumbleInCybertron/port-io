"use client"

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
      <div className="w-[150px] mx-auto mt-10 text-2xl">ラインチャート</div>
      <Line data={data} width={100} height={40} options={options} />
    </>
  );
}