import "@/app/styles/globals.css"
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/components/Buttons";
import Navbar from "@/components/Navbar";
import { DoubleChart } from "@/components/charts/DoubleChart";
import { LineChart } from "@/components/charts/LineChart";
import { getLineChartData } from "@/utils/getLineChartData";
import {
  Chart, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { _DeepPartialObject } from "chart.js/dist/types/utils";
Chart.register(CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,);
import Link from "next/link";


export default async function Home() {
  const chartData = await getLineChartData();
  chartData.width = 400;
  chartData.height = 160;

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="container flex items-center justify-center font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <div>ホームページをこちらに埋め込んで下さいませ</div>
        </div>
        <div className="
          container 
          flex 
          items-center 
          justify-center 
          h-64
          bg-gradient-to-r 
          from-orange-400
          to-blue-500
          via-purple-500
          animate-gradient-x  
        ">
          <h1 className="text-white text-3xl font-semibold">真ん中になんか入ってる物</h1>
        </div>
        <div className="container flex items-center justify-center h-64">
          <LineChart {...chartData} />
        </div>
        <div className="          
          container 
          flex 
          items-center 
          justify-center 
          h-64
          bg-gradient-to-r 
          from-blue-400
          to-orange-500
          via-purple-500
          animate-gradient-x  
          ">
          <div className="text-white text-3xl font-semibold">チャートが大好きな人こちらに来てほしいです</div>
        </div>
        <div className="container flex items-center justify-center h-64"></div>

        <div className="container flex items-center justify-center h-[35rem]">
          <iframe
            src="/sample-chart.html"
            width="100%"
            height="100%"
          />
        </div>
        <div className="container flex items-center justify-center h-[35rem]">
          <Link rel="import" href="/sample-chart.html" />
        </div>
      </div>
    </>
  );
}
