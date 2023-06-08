import { LineChart } from "@/components/charts/LineChart";
import { getThirtyDays } from "@/utils/getThirtyDays";

export default async function LineChartPage() {
  const thirtyDays = getThirtyDays();

  const data = {
    labels: thirtyDays,
    datasets: [{
      data: [86, 114, 106, 106, 107, 111, 133],
    }, {
      data: [70, 90, 44, 60, 83, 90, 100],
    }, {
      data: [10, 21, 60, 44, 17, 21, 17],
    }, {
      data: [6, 3, 2, 2, 7, 0, 16],
    }
    ]
  };

  return (
    <LineChart {...data} />
  )
}