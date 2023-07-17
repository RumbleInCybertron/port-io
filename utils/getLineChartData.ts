export const getLineChartData = async () => {
  const startDate = new Date("2022-12-01");
  const endDate = new Date("2023-01-07");

  const history = await prisma.historicalData.findMany({
    where: {
      ticker: "AAPL",
      date: {
        lte: endDate,
        gte: startDate
      }
    },
    orderBy: { date: "asc" }
  });
  const marketDates = history.map((e: any) => e.date.toLocaleDateString('en-US'));
  const width = 0;
  const height = 0;

  return {
    labels: marketDates,
    datasets: [
      {
        label: "Stock",
        data: history.map((e: any) => e.close!),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
    width,
    height,
  };
};