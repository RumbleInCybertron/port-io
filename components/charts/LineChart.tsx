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
import { useEffect, useRef, useState } from "react";

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

import { Chart, Line } from "react-chartjs-2";
import { ChartData, ChartArea } from 'chart.js';
import { faker } from '@faker-js/faker';

type DataProps = {
  labels: string[];
  datasets: { data: number[] }[];
  width: number;
  height: number;
}

const colors = [
  'red',
  'orange',
  'yellow',
  'lime',
  'green',
  'teal',
  'blue',
  'purple',
];

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const colorStart = faker.helpers.arrayElement(colors);
  console.log("colorStart", colorStart);
  const colorMid = faker.helpers.arrayElement(
    colors.filter(color => color !== colorStart)
  );
  const colorEnd = faker.helpers.arrayElement(
    colors.filter(color => color !== colorStart && color !== colorMid)
  );

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(0.5, colorMid);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}

export function LineChart(data: DataProps) {
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const chartData = {
      ...data,
      datasets: data.datasets.map(dataset => ({
        ...dataset,
        borderColor: createGradient(chart.ctx, chart.chartArea),
      })),
    };
    setChartData(chartData);
  }, [data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    // elements: {
    //   line: {
    //     tension: 0,
    //     borderWidth: 2,
    //     borderColor: "rgba(47,97,68,1)",
    //     fill: "start",
    //     backgroundColor: "rgba(47,97,68,0.3)",
    //   },
    // },
    scales: {
      xAxis: {
        display: false,
        gridLines: {
          color: "red"
        }
      },
      y: {
        gridLines: {
          color: "red",
        },
        display: true,
        ticks: {
          callback: function (value: any) {
            return '$' + value;
          }
        },
      },
    },
  }

  return (
    <>
      {/* line chart */}
      <div className="container bg-black border-solid border-2 border-sky-500 rounded">
        <div className="w-[150px] mx-auto mt-10 text-yellow-100 text-xl">ラインチャート</div>
        <Chart ref={chartRef} type="line" data={chartData} width={data.width} height={data.height} options={options} />
      </div>
    </>
  );
};