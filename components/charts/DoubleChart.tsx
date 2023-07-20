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
  Chart,
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
  width: number;
  height: number;
}

export function DoubleChart() {
  // myChart.defaults.font.family = "'FontAwesome','Helvetica', 'Helvetica Neue', 'Arial', sans-serif";

  const dates: Date[] = [];
  const numbers: number[] = [];
  const volume: number[] = [];

  for (let i = 0; i < 200; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    date.setHours(0, 0, 0, 0)
    dates.push(date);
    numbers.push(Math.random() * 10);
    volume.push(Math.random() * 100);
  };

  // setup 
  const data = {
    labels: dates,
    // labels: ['2023-02-28', '2023-03-01', '2023-03-02', '2023-03-03', '2023-03-04', '2023-03-05', '2023-03-06'],
    datasets: [{
      label: '取引週',
      data: numbers,
      // data: [9.33, 12, 6, 9, 12, 3, 9],
      // backgroundColor: [
      //   'rgba(255, 26, 104, 0.2)',
      //   'rgba(54, 162, 235, 0.2)',
      //   'rgba(255, 206, 86, 0.2)',
      //   'rgba(75, 192, 192, 0.2)',
      //   'rgba(153, 102, 255, 0.2)',
      //   'rgba(255, 159, 64, 0.2)',
      //   'rgba(0, 0, 0, 0.2)'
      // ],
      fill: {
        target: {
          value: numbers[0]
        },
        below: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea, data, scales } = chart;
          if (!chartArea) {
            return null;
          }
          return belowGradient(ctx, chartArea, data, scales);
        },
        above: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea, data, scales } = chart;
          if (!chartArea) {
            return null;
          }
          return aboveGradient(ctx, chartArea, data, scales);
        },
      },
      borderColor: (context: any) => {
        const chart = context.chart;
        const { ctx, chartArea, data, scales } = chart;
        if (!chartArea) {
          return null;
        }
        return getGradient(ctx, chartArea, data, scales);
      },
      tension: 0,
      pointRadius: 0,
      pointHitRadius: 0,
      pointHoverRadius: 0,
      borderWidth: 2,
    }, {
      label: 'Stock Volume',
      type: 'bar',
      data: volume,
      pointHitRadius: 0,
      pointHoverRadius: 0,
      yAxisID: 'volume',
    }]
  };

  // dottedLine plugin block
  const dottedLine = {
    id: 'dottedLine',
    beforeDatasetsDraw(chart: Chart, args: {}, pluginOptions: []) {
      const { ctx, data, chartArea: { left, right, width }, scales: { x, y } } = chart;
      const startingPoint = data.datasets[0].data[data.labels!.indexOf(x.min)] as number;

      if (startingPoint !== null) {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.setLineDash([1, 5]);
        ctx.strokeStyle = 'rgba(102,102,102,1)';
        ctx.moveTo(left, y.getPixelForValue(startingPoint));
        ctx.lineTo(right, y.getPixelForValue(startingPoint));
        ctx.stroke();
        ctx.closePath();
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.fillStyle = 'rgba(102,102,102,1)';
        ctx.fillRect(0, y.getPixelForValue(startingPoint) - 10, left, 20);
        ctx.closePath();

        ctx.font = '12px sans-serif';
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(startingPoint.toFixed(2), left / 2, y.getPixelForValue(startingPoint));
      }
    }
  }

  // imageLogo plugin block
  const logo = new Image();
  logo.src = '../images/Logo_name.png';

  const imageLogo = {
    id: 'imageLogo',
    beforeDatasetsDraw(chart: Chart, args: {}, pluginOptions: []) {
      const { ctx, chartArea: { top, bottom, left, right }, scales: { x, y } } = chart;
      ctx.save();
      const imgWidth = 80;
      const imgHeight = 30;
      if (logo.complete) {
        ctx.drawImage(logo, right - imgWidth - 10, y.getPixelForValue(2), imgWidth, imgHeight)
      } else {
        logo.onload = () => chart.draw();
      }
      ctx.restore();
    }
  };

  // // customTickMarks plugin block
  // const customTickMarks = {
  //   id: 'customTickMarks',
  //   beforeDatasetsDraw(chart, args, pluginOptions) {
  //     const { ctx, data, chartArea: {bottom}, scales: {x,y} } = chart;
  //     ctx.save();
  //     const startTick = dates.indexOf(x.min);
  //     const endTick = dates.indexOf(x.max);
  //     const totalTicks = endTick - startTick;
  //     console.log(totalTicks);

  //     dates.forEach((date, index) => {
  //       ctx.beginPath();
  //       ctx.strokeStyle = 'rgba(102, 102, 102, 0.5)';
  //       ctx.lineWidth = 1;

  //       if(new Date(date).getDate() === 1) {
  //         ctx.moveTo(x.getPixelForValue(new Date(date)), bottom);
  //         ctx.lineTo(x.getPixelForValue(new Date(date)), bottom + 8);
  //       }

  //       if(new Date(date).getDate() === 10 || new Date(date).getDate() === 20) {
  //         ctx.moveTo(x.getPixelForValue(new Date(date)), bottom);
  //         ctx.lineTo(x.getPixelForValue(new Date(date)), bottom + 8);
  //       }

  //       if(totalTicks < 40) {
  //         ctx.moveTo(x.getPixelForValue(new Date(date)), bottom);
  //         ctx.lineTo(x.getPixelForValue(new Date(date)), bottom + 8);
  //       }

  //       ctx.stroke();
  //       ctx.closePath();
  //       ctx.restore();
  //     })
  //   }
  // };

  // customToolTip plugin block
  const customTooltip = {
    id: 'customToolTip',
    afterDraw(chart: Chart, args: {}, pluginOptions: []) {
      const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;
      ctx.save();

      chart.canvas.addEventListener('mousemove', (e: any) => {
        tooltipPosition(e)
      });

      function tooltipPosition(mousemove: MouseEvent) {
        let xTooltip;
        let yTooltip;
        const rightSide = right - mousemove.offsetX;
        if (rightSide <= 170) {
          xTooltip = mousemove.offsetX - 170;
        } else {
          xTooltip = mousemove.offsetX + 20;
        }

        if (mousemove.offsetY <= 100 && yTooltip !== undefined) {
          yTooltip - mousemove.offsetY + 30;
        } else {
          yTooltip = mousemove.offsetY - 80;
        }

        let xLeft;
        let xRight;
        if (x.min = parseInt(dates[0].toString())) {
          xLeft = x.getPixelForValue(parseInt(dates[0].toString()));
        } else {
          xLeft = left;
        }

        if (x.max = parseInt(dates[dates.length - 1].toString())) {
          xRight = x.getPixelForValue(parseInt(dates[dates.length - 1].toString()));
        } else {
          xRight = right;
        }

        if (mousemove.offsetX >= xLeft && mousemove.offsetX <= xRight && mousemove.offsetY >= top && mousemove.offsetY <= bottom) {
          ctx.beginPath();
          ctx.fillStyle = 'rgba(102,102,102, 1)';
          ctx.strokeStyle = 'rgba(102,102,102, 1)';
          ctx.lineJoin = 'round';
          ctx.lineWidth = 5;
          ctx.fillRect(xTooltip, yTooltip, 150, 60);
          ctx.strokeRect(xTooltip, yTooltip, 150, 60);
          ctx.closePath();
          ctx.restore();

          const dateCursor = new Date(x.getValueForPixel(mousemove.offsetX) as number);
          const dc = new Date(dateCursor.setHours(0, 0, 0, 0))
          const dateIndex = dates.indexOf(dc);

          // text date
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'white';
          ctx.font = 'bolder 12px sans-serif';
          ctx.fillText(dateCursor.toLocaleDateString(), xTooltip + 5, yTooltip + 10);
          ctx.restore();

          // text time
          ctx.textAlign = 'right';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'lightgrey';
          ctx.font = 'bolder 10px sans-serif';
          ctx.fillText(new Date(x.getValueForPixel(mousemove.offsetX) as number).toLocaleTimeString(), xTooltip + 150 - 5, yTooltip + 10);
          ctx.restore();

          // line 2 color dot
          let dotColor;
          if (numbers[dateIndex] > numbers[0]) {
            dotColor = 'rgba(75, 192, 192, 1)';
          } else {
            dotColor = 'rgba(255, 26, 104, 1)';
          };

          const dotSpace = 15;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = dotColor;
          // ctx.font = 'bolder 12px FontAwesome';
          ctx.fillText('\uf111', xTooltip + 5, yTooltip + 30);
          ctx.restore();

          // line 2 text price
          const priceText = 'Price: ';
          const priceTextWidth = ctx.measureText(priceText).width;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'lightgrey';
          ctx.font = 'bolder 12px sans-serif';
          ctx.fillText(priceText, xTooltip + 5 + dotSpace, yTooltip + 30);
          ctx.restore();

          // line 2 price value
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'white';
          ctx.font = '12px sans-serif';
          ctx.fillText(' $ ' + numbers[dateIndex].toFixed(2), xTooltip + 5 + dotSpace + priceTextWidth, yTooltip + 30);
          ctx.restore();

          // line 3 icon
          const iconSpace = 15;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'white';
          // ctx.font = 'bolder 12px FontAwesome';
          ctx.fillText('\uf080', xTooltip + 5, yTooltip + 50);
          ctx.restore();

          // line 3 text value
          const valueText = 'Value: ';
          const valueTextWidth = ctx.measureText(valueText).width;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'lightgrey';
          ctx.font = '12px sans-serif';
          ctx.fillText(valueText, xTooltip + 5 + iconSpace, yTooltip + 50);
          ctx.restore();

          // line 3 price value
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'white';
          ctx.font = 'bolder 12px sans-serif';
          ctx.fillText(volume[dateIndex].toFixed(0), xTooltip + 5 + iconSpace + valueTextWidth, yTooltip + 50);
          ctx.restore();
        };
      };
    }
  };

  // config 
  const config = {
    type: "line",
    data,
    options: {
      layout: {
        padding: {
          left: 10,
          right: 5,
        }
      },
      scales: {
        x: {
          type: 'time', // use 'timeseries' to skip weekends
          time: {
            unit: 'day'
          },
          min: dates[0],
          max: dates[dates.length - 1],
          grid: {
            // display: false
            drawOnChartArea: false,
            drawTicks: true,
            drawBorder: false,
            offset: false,
          },
          ticks: {
            callback: ((value: number, index: number, values: any) => {
              const totalTicks = values.length - 2;
              const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              const currentTick = new Date(values[index].value);

              if (currentTick.getDate() === 1) {
                return monthArray[currentTick.getMonth()];
              }
              if (currentTick.getDate() === 10
                || currentTick.getDate() === 20) {
                return currentTick.getDate();
              }
              if (totalTicks < 40) {
                return currentTick.getDate();
              }
            }),
            font: {
              weight: (values: any) => {
                if (values.tick.label.length === 3) {
                  return 'bold';
                }
              }
            }
          },
        },
        y: {
          beginAtZero: true
        },
        volume: {
          type: 'linear',
          position: 'right',
          min: 0,
          max: 1000,
          grid: {
            display: false
          },
          ticks: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false
        },
      }
    },
    plugins: [dottedLine, imageLogo, customTooltip]
  };

  // render init block
  const myChart = new Chart(
    document.getElementById('myChart') as HTMLCanvasElement,
    {
      type: "line",
      data: {
        labels: dates,
        // labels: ['2023-02-28', '2023-03-01', '2023-03-02', '2023-03-03', '2023-03-04', '2023-03-05', '2023-03-06'],
        datasets: [{
          label: '取引週',
          data: numbers,
          // data: [9.33, 12, 6, 9, 12, 3, 9],
          // backgroundColor: [
          //   'rgba(255, 26, 104, 0.2)',
          //   'rgba(54, 162, 235, 0.2)',
          //   'rgba(255, 206, 86, 0.2)',
          //   'rgba(75, 192, 192, 0.2)',
          //   'rgba(153, 102, 255, 0.2)',
          //   'rgba(255, 159, 64, 0.2)',
          //   'rgba(0, 0, 0, 0.2)'
          // ],
          fill: 1,
          // {
          // target: {
          //   value: numbers[0]
          // },
          // below: (context:CanvasRenderingContext2D) => {
          //   const chart = context.chart;
          //   const { ctx, chartArea, data, scales } = chart;
          //   if (!chartArea) {
          //     return null;
          //   }
          //   return belowGradient(ctx, chartArea, data, scales);
          // },
          // above: (context: CanvasRenderingContext2D) => {
          //   const chart = context.chart;
          //   const { ctx, chartArea, data, scales } = chart;
          //   if (!chartArea) {
          //     return null;
          //   }
          //   return aboveGradient(ctx, chartArea, data, scales);
          // },
          // },
          borderColor: (context: any) => {
            const chart = context.chart;
            const { ctx, chartArea, data, scales } = chart;
            if (!chartArea) {
              return null;
            }
            return getGradient(ctx, chartArea, data, scales);
          },
          tension: 0,
          pointRadius: 0,
          pointHitRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 2,
        }, {
          label: 'Stock Volume',
          type: 'bar',
          data: volume,
          // pointHitRadius: 0,
          // pointHoverRadius: 0,
          yAxisID: 'volume',
        }]
      },
      options: {
        layout: {
          padding: {
            left: 10,
            right: 5,
          }
        },
        scales: {
          x: {
            type: 'time', // use 'timeseries' to skip weekends
            time: {
              unit: 'day'
            },
            min: dates[0].toString(),
            max: dates[dates.length - 1].toString(),
            grid: {
              // display: false
              drawOnChartArea: false,
              drawTicks: true,
              // drawBorder: false,
              offset: false,
            },
            ticks: {
              callback: ((value: any, index: number, values: any) => {
                const totalTicks = values.length - 2;
                const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const currentTick = new Date(values[index].value);

                if (currentTick.getDate() === 1) {
                  return monthArray[currentTick.getMonth()];
                }
                if (currentTick.getDate() === 10
                  || currentTick.getDate() === 20) {
                  return currentTick.getDate();
                }
                if (totalTicks < 40) {
                  return currentTick.getDate();
                }
              }),
              font: {
                weight: (values: any) => {
                  if (values.tick.label.length === 3) {
                    return 'bold';
                  }
                }
              }
            },
          },
          y: {
            beginAtZero: true
          },
          volume: {
            type: 'linear',
            position: 'right',
            min: 0,
            max: 1000,
            grid: {
              display: false
            },
            ticks: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false
          },
        }
      },
      plugins: [dottedLine, imageLogo, customTooltip]
    }
  );

  function getGradient(ctx: any, chartArea: any, data: any, scales: any) {
    const { left, right, top, bottom, width, height } = chartArea;
    const { x, y } = scales;
    const gradientBorder = ctx.createLinearGradient(0, 0, 0, bottom);
    let shift = y.getPixelForValue(data.datasets[0].data[data.labels.indexOf(x.min)]) / bottom; // pixel percentage shift

    if (shift > 1) {
      shift = 1;
    }

    if (shift < 0) {
      shift = 0;
    }


    gradientBorder.addColorStop(0, 'rgba(75, 192, 192, 1)');
    gradientBorder.addColorStop(shift, 'rgba(75, 192, 192, 1)');
    gradientBorder.addColorStop(shift, 'rgba(255, 26, 104, 1)');
    gradientBorder.addColorStop(1, 'rgba(255, 26, 104, 1)');
    return gradientBorder;
  };

  function belowGradient(ctx: any, chartArea: any, data: any, scales: any) {
    const { left, right, top, bottom, width, height } = chartArea;
    const { x, y } = scales;
    const gradientBackground = ctx.createLinearGradient(0, y.getPixelForValue(data.datasets[0].data[0]), 0, bottom);
    gradientBackground.addColorStop(0, 'rgba(255, 26, 104, 0)');
    gradientBackground.addColorStop(1, 'rgba(255, 26, 104, 0.5)');
    return gradientBackground;
  };

  function aboveGradient(ctx: any, chartArea: any, data: any, scales: any) {
    const { left, right, top, bottom, width, height } = chartArea;
    const { x, y } = scales;
    const gradientBackground = ctx.createLinearGradient(0, y.getPixelForValue(data.datasets[0].data[0]), 0, top);
    gradientBackground.addColorStop(0, 'rgba(75, 192, 192, 0)');
    gradientBackground.addColorStop(1, 'rgba(75, 192, 192, 0.5)');
    return gradientBackground;
  };

  myChart.canvas.addEventListener('mousemove', (e: any) => {
    crosshairLine(myChart, e)
  });

  function crosshairLine(chart: Chart, mousemove: MouseEvent) {
    const { canvas, ctx, chartArea: { left, right, top, bottom } } = chart;

    const coorX = mousemove.offsetX;
    const coorY = mousemove.offsetY;

    chart.update('none');
    ctx.restore();

    if (coorX >= left && coorX <= right && coorY >= top && coorY <= bottom) {
      canvas.style.cursor = 'crosshair';
    } else {
      canvas.style.cursor = 'default';
    }

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#666';
    ctx.setLineDash([3, 3]);

    if (coorX >= left && coorX <= right && coorY >= top && coorY <= bottom) {
      // Horizontal Line
      ctx.beginPath();
      ctx.moveTo(left, coorY);
      ctx.lineTo(right, coorY);
      ctx.stroke();
      ctx.closePath();

      // Vertical Line
      ctx.beginPath();
      ctx.moveTo(coorX, top);
      ctx.lineTo(coorX, bottom);
      ctx.stroke();
      ctx.closePath();

      crosshairLabel(chart, mousemove);
      crosshairPoint(chart, mousemove);
    }
    ctx.setLineDash([]);
  };

  function crosshairLabel(chart: any, mousemove: MouseEvent) {
    const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

    const coorX = mousemove.offsetX;
    const coorY = mousemove.offsetY;
    const textWidth = ctx.measureText(new Date(x.getValueForPixel(coorX)).toLocaleString()).width + 10;

    ctx.font = '12px sans-serif';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    // yLabel
    ctx.beginPath();
    ctx.fillStyle = 'rgba(132, 132, 132, 1)';
    ctx.fillRect(0, coorY - 10, left, 20);
    ctx.closePath();

    ctx.fillStyle = 'white';
    ctx.fillText(y.getValueForPixel(coorY).toFixed(2), left / 2, coorY);

    // xLabel
    ctx.beginPath();
    ctx.fillStyle = 'rgba(132, 132, 132, 1)';
    ctx.fillRect(coorX - (textWidth / 2), bottom, textWidth, 20);
    ctx.closePath();

    ctx.fillStyle = 'white';
    ctx.fillText(new Date(x.getValueForPixel(coorX)).toLocaleString(), coorX, bottom + 10);

  };

  function crosshairPoint(chart: any, mousemove: MouseEvent) {
    const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

    const coorX = mousemove.offsetX;
    const coorY = mousemove.offsetY;

    ctx.beginPath();
    // ctx.fillStyle = 'rgba(255, 26, 104, 1)';
    ctx.strokeStyle = '#FFF';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);

    const angle = Math.PI / 180;

    const leftOffset = x.getPixelForValue(x.min) - left;
    const rightOffset = right - x.getPixelForValue(x.max);
    const width2 = width - (leftOffset + rightOffset);


    const segments = width2 / (dates.indexOf(x.max) - dates.indexOf(x.min));
    const yOpening = y.getPixelForValue(data.datasets[0].data[0]); // solid
    let index = Math.floor((coorX - (left + leftOffset)) / segments) + dates.indexOf(x.min);

    let yStart = y.getPixelForValue(data.datasets[0].data[index]);
    let yEnd = y.getPixelForValue(data.datasets[0].data[index + 1]);
    let yInterpolation = yStart + ((yEnd - yStart) / segments * (coorX - x.getPixelForValue(data.labels[index])));

    if (yOpening >= yInterpolation) {
      ctx.fillStyle = 'rgba(75, 192, 192, 1)';
    } else {
      ctx.fillStyle = 'rgba(255, 26, 104, 1)';
    }

    // draw the circle
    ctx.arc(
      coorX,
      yInterpolation,
      5,
      angle * 0,
      angle * 360,
      false
    );
    ctx.fill();
    ctx.stroke();
  }

  function zoom(chart: any, mousewheel: WheelEvent) {
    const min = chart.config.options.scales.x.min;
    const max = chart.config.options.scales.x.max;

    const timestamp = chart.scales.x.getValueForPixel(mousewheel.offsetX);
    const ts = new Date(timestamp).setHours(0, 0, 0, 0);
    const dayTimestamp = new Date(ts);
    const scrollPoint = dates.indexOf(dayTimestamp);

    if (mousewheel.deltaY >= 0) {
      chart.config.options.scales.x.min = dates[dates.indexOf(min) + 1]
      chart.config.options.scales.x.max = dates[dates.indexOf(max) - 1]

      if (parseInt(dates[dates.indexOf(min)].toString()) <= 0) {
        chart.config.options.scales.x.min = dates[0];
      }

      if (dates.indexOf(min) >= scrollPoint - 4 && dates.indexOf(min) <= scrollPoint) {
        chart.config.options.scales.x.min = min;
      }

      if (dates.indexOf(max) <= scrollPoint + 4 && dates.indexOf(max) >= scrollPoint) {
        chart.config.options.scales.x.max = max;
      }
    }

    if (mousewheel.deltaY < 0) {
      chart.config.options.scales.x.min = dates[dates.indexOf(min) - 1]
      chart.config.options.scales.x.max = dates[dates.indexOf(max) + 1]

      if (dates[dates.indexOf(max)] >= dates[dates.length - 1]) {
        chart.config.options.scales.x.max = dates[dates.length - 1];
      }

      const weekms = 86400000 * 14;
      const range = max - min;
      if (range >= weekms) {
        if (dates.indexOf(min) >= scrollPoint - 4 && dates.indexOf(min) <= scrollPoint) {
          chart.config.options.scales.x.min = min;
        }

        if (dates.indexOf(max) <= scrollPoint + 4 && dates.indexOf(max) >= scrollPoint) {
          chart.config.options.scales.x.max = max;
        }
      }
    };

    // if(dates[dates.indexOf(min)] <= 0) {
    //   chart.config.options.scales.x.min = dates[0];
    // }

    // if(dates[dates.indexOf(max)] >= dates[dates.length - 1]) {
    //   chart.config.options.scales.x.max = dates[dates.length - 1];
    // }
    zoomedArea(min, max);
    chart.update('none');
  }
  myChart.canvas.addEventListener('wheel', (e: any) => {
    zoom(myChart, e);
  })

  // setup 
  const data2 = {
    labels: dates,
    datasets: [{
      label: '取引週',
      data: numbers,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      fill: true,
      pointRadius: 0,
      pointHoverRadius: 0,
      pointHitRadius: 0,
      borderWidth: 1,
    }]
  };

  // config 
  const config2 = {
    type: 'line',
    data: data2,
    options: {
      animation: false,
      layout: {
        padding: {
          left: myChart.chartArea.left,
          right: myChart.width - myChart.chartArea.right,
        },
      },
      aspectRatio: 10,
      scales: {
        x: {
          type: 'time', // use 'timeseries' to skip weekends
          time: {
            unit: 'day'
          },
          min: dates[0],
          max: dates[dates.length - 1],
          grid: {
            drawborder: false,
            drawTicks: false,
          },
          ticks: {
            mirror: true,
            callback: ((value: number, index: number, values: any) => {
              const totalTicks = values.length - 2;
              const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              const currentTick = new Date(values[index].value);

              if (currentTick.getDate() === 1) {
                return monthArray[currentTick.getMonth()];
              }
              if (currentTick.getDate() === 10
                || currentTick.getDate() === 20) {
                return currentTick.getDate();
              }
              if (totalTicks < 40) {
                return currentTick.getDate();
              }
            }),
            font: {
              weight: (values: any) => {
                if (values.tick.label.length === 3) {
                  return 'bold';
                }
              }
            }
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            display: false,
          },
          grid: {
            display: false,
            drawborder: false,
          },
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      }
    }
  };

  // render init block
  const myChart2 = new Chart(
    document.getElementById('myChart2') as HTMLCanvasElement,
    {
      type: 'line',
      data: data2,
      options: {
        animation: false,
        layout: {
          padding: {
            left: myChart.chartArea.left,
            right: myChart.width - myChart.chartArea.right,
          },
        },
        aspectRatio: 10,
        scales: {
          x: {
            type: 'time', // use 'timeseries' to skip weekends
            time: {
              unit: 'day'
            },
            min: dates[0].toString(),
            max: dates[dates.length - 1].toString(),
            grid: {
              // drawborder: false,
              drawTicks: false,
            },
            ticks: {
              mirror: true,
              callback: ((value: any, index: number, values: any) => {
                const totalTicks = values.length - 2;
                const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const currentTick = new Date(values[index].value);

                if (currentTick.getDate() === 1) {
                  return monthArray[currentTick.getMonth()];
                }
                if (currentTick.getDate() === 10
                  || currentTick.getDate() === 20) {
                  return currentTick.getDate();
                }
                if (totalTicks < 40) {
                  return currentTick.getDate();
                }
              }),
              font: {
                weight: (values: any) => {
                  if (values.tick.label.length === 3) {
                    return 'bold';
                  }
                }
              }
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              display: false,
            },
            grid: {
              display: false,
              // drawborder: false,
            },
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        }
      }
    }
  );

  window.onload = function () {
    zoomedArea(parseInt(dates[0].toString()), parseInt(dates[dates.length - 1].toString()));
  };

  function zoomedArea(min: number, max: number) {
    // area
    myChart2.update('none');
    const { ctx, canvas, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = myChart2;

    if (min === undefined) min = parseInt(dates[0].toString());

    zoomedAreaItem(min, max);

    function zoomedAreaItem(min: number, max: number) {

      if (min === undefined || min === -1) {
        min = parseInt(dates[0].toString());
      }

      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = 'rgba(54, 162, 235, 0.2)';
      ctx.fillRect(x.getPixelForValue(min), top, x.getPixelForValue(max) - x.getPixelForValue(min), height);
      ctx.closePath();
      ctx.restore();

      // slider
      const angle = Math.PI / 180;

      slider(x.getPixelForValue(min));
      slider(x.getPixelForValue(max));
      function slider(position: any) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(54, 162, 235, 1)';
        ctx.lineWidth = 2;
        ctx.fillStyle = '#FFF';
        ctx.arc(position, height / 2, 10, angle * 0, angle * 360, false);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.restore();

        ctx.strokeStyle = 'rgba(54, 162, 235, 1)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(position - 3, height / 2 - 5);
        ctx.lineTo(position - 3, height / 2 + 5);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(position + 3, height / 2 - 5);
        ctx.lineTo(position + 3, height / 2 + 5);
        ctx.stroke();
        ctx.restore();
      };
    };


    canvas.addEventListener('mousemove', (e: any) => {
      mouseCursor(e)
    });

    function mouseCursor(mousemove: MouseEvent) {
      let minChart1 = myChart.config.options!.scales!.x!.min as number;

      if (minChart1 === undefined || minChart1 === -1) {
        minChart1 = parseInt(dates[0].toString());
      };

      if (
        mousemove.offsetX >= x.getPixelForValue(minChart1) - 10
        && mousemove.offsetX <= x.getPixelForValue(minChart1) + 10
        || mousemove.offsetX > x.getPixelForValue(myChart.config.options!.scales!.x!.max as number) - 10
        && mousemove.offsetX < x.getPixelForValue(myChart.config.options!.scales!.x!.max as number) + 10) {
        canvas.style.cursor = 'ew-resize'; // east-west resize
      } else if (
        mousemove.offsetX > x.getPixelForValue(minChart1) + 10
        && mousemove.offsetX < x.getPixelForValue(myChart.config.options!.scales!.x!.max as number) - 10) {
        canvas.style.cursor = 'move';
      } else {
        canvas.style.cursor = 'default';
      }
    };

    canvas.addEventListener('mousedown', (e: any) => {
      dragStart(e);
    });

    window.addEventListener('mouseup', (e) => {
      canvas.onmousemove = null;
    })

    function dragStart(drag: any) {
      let minChart1 = myChart.config.options!.scales!.x!.min as number;
      let maxChart1 = myChart.config.options!.scales!.x!.max as number;
      if (minChart1 === undefined || minChart1 === -1) {
        minChart1 = parseInt(dates[0].toString());
      };

      if (drag.offsetX >= x.getPixelForValue(minChart1) - 10
        && drag.offsetX <= x.getPixelForValue(minChart1) + 10) {
        canvas.onmousemove = (e: any) => {
          dragMove(myChart, e);
        };

        const dragMove = function (myChart: any, dragDelta: any) {
          const timestamp = x.getValueForPixel(dragDelta.offsetX);
          const dayTimestamp = new Date(timestamp!.toString()).setHours(0, 0, 0, 0);
          const dts = new Date(dayTimestamp)
          let scrollPoint = dates.indexOf(dts);

          if (dragDelta.offsetX < left && scrollPoint === -1) {
            scrollPoint = 0;
          }

          if (dragDelta.offsetX > right && scrollPoint === -1) {
            scrollPoint = dates.indexOf(myChart.config.options.scales.x.max) - 4;
          }

          if (scrollPoint > dates.indexOf(myChart.config.options.scales.x.max) - 4) {
            scrollPoint = dates.indexOf(myChart.config.options.scales.x.max) - 4;
          }

          myChart.config.options.scales.x.min = dates[scrollPoint];
          myChart.update('none');
          myChart2.update('none');
          zoomedAreaItem(parseInt(dates[scrollPoint].toString()), myChart.config.options.scales.x.max);
        }
      };

      if (drag.offsetX >= x.getPixelForValue(myChart.config.options!.scales!.x!.max as number) - 10
        && drag.offsetX <= x.getPixelForValue(myChart.config.options!.scales!.x!.max as number) + 10) {
        canvas.onmousemove = (e: any) => {
          dragMove(myChart, e);
        };

        const dragMove = function (myChart: any, dragDelta: any) {
          const timestamp = x.getValueForPixel(dragDelta.offsetX);
          const dayTimestamp = new Date(timestamp!).setHours(0, 0, 0, 0);
          const dts = new Date(dayTimestamp);
          let scrollPoint = dates.indexOf(dts);

          if (dragDelta.offsetX > right && scrollPoint === -1) {
            scrollPoint = dates.length - 1;
          }

          if (dragDelta.offsetX < left && scrollPoint === -1) {
            scrollPoint = dates.indexOf(myChart.config.options.scales.x.min) + 4;
          }

          if (scrollPoint < dates.indexOf(myChart.config.options.scales.x.min) + 4) {
            scrollPoint = dates.indexOf(myChart.config.options.scales.x.min) + 4;
          }

          myChart.config.options.scales.x.max = dates[scrollPoint];
          myChart.update('none');
          myChart2.update('none');
          zoomedAreaItem(myChart.config.options.scales.x.min, parseInt(dates[scrollPoint].toString()));
        };
      };

      if (drag.offsetX > x.getPixelForValue(myChart.config.options!.scales!.x!.min as number) + 11
        && drag.offsetX < x.getPixelForValue(myChart.config.options!.scales!.x!.max as number) - 11) {
        canvas.onmousemove = (e: any) => {
          dragMoveCenter(myChart, e, minChart1, maxChart1);
        };

        const dragMoveCenter = function (myChart: any, dragDelta: any, staticScaleMin: any, staticScaleMax: any) {
          // starting point
          const dragStartingPoint = x.getValueForPixel(drag.offsetX) as number;
          const dayDragStartingPoint = new Date(dragStartingPoint).setHours(0, 0, 0, 0);
          const ddsp = new Date(dayDragStartingPoint);
          let dragStart = dates.indexOf(ddsp);

          // difference
          const timestamp = x.getValueForPixel(dragDelta.offsetX) as number;
          const dayTimestamp = new Date(timestamp).setHours(0, 0, 0, 0);
          const dts = new Date(dayTimestamp);
          let scrollPoint = dates.indexOf(dts);

          const difference = scrollPoint - dragStart;

          if (scrollPoint === -1 && dragDelta.offsetX >= right) {
            scrollPoint = dates.length - 1;
          };

          const range = dates.indexOf(staticScaleMax) - dates.indexOf(staticScaleMin);
          const minVal = dates.indexOf(staticScaleMax) + difference - range; // 0
          const maxVal = dates.indexOf(staticScaleMax) + difference; // 199

          let minChart1;
          let maxChart1;

          if (minVal <= 0 && dragDelta.offsetX < right) {
            minChart1 = parseInt(dates[0].toString());
            maxChart1 = parseInt(dates[range].toString());
          } else if (maxVal >= dates.length - 1
            || difference < 0
            && dragDelta.offsetX >= right) {
            minChart1 = parseInt(dates[dates.length - 1 - range].toString());
            maxChart1 = parseInt(dates[dates.length - 1].toString());
          } else {
            minChart1 = parseInt(dates[dates.indexOf(staticScaleMin) + difference].toString());
            maxChart1 = parseInt(dates[dates.indexOf(staticScaleMax) + difference].toString());
          }

          // let difference2 = 0;

          // if (dragDelta.movementX > 0) {
          //   difference2 = 1;
          // }

          // if (dragDelta.movementX < 0) {
          //   difference2 = -1;
          // }

          // let minChart1 = dates[dates.indexOf(myChart.config.options.scales.x.min) + difference];
          // let maxChart1 = dates[dates.indexOf(myChart.config.options.scales.x.max) + difference];

          if (minChart1 === undefined) {
            minChart1 = parseInt(dates[0].toString());
          };

          if (maxChart1 === undefined) {
            maxChart1 = parseInt(dates[dates.length - 1].toString());
          };

          if (minChart1 === parseInt(dates[0].toString())) {
            myChart.config.options.scales.x.min = dates[0];
            myChart.config.options.scales.x.max = myChart.config.options.scales.x.max;
          } else if (maxChart1 === parseInt(dates[dates.length - 1].toString())) {
            myChart.config.options.scales.x.min = myChart.config.options.scales.x.min;
            myChart.config.options.scales.x.max = dates[dates.length - 1];
          } else if (myChart.config.options.scales.x.min >= dates[0]
            && myChart.config.options.scales.x.max <= dates[dates.length - 1]) {
            myChart.config.options.scales.x.min = minChart1;
            myChart.config.options.scales.x.max = maxChart1;
          }

          myChart.update('none');
          myChart2.update('none');
          zoomedAreaItem(minChart1, maxChart1);
        };
      };
    };
  };

  window.addEventListener('resize', (e) => {
    myChart2.resize();
    zoomedArea(myChart.config.options!.scales!.x!.min as number, myChart.config.options!.scales!.x!.max as number);
  });


  return (
    <>
      {/* line chart */}
      <div>
        <div className="w-[150px] mx-auto mt-10 text-xl">ラインチャート</div>
        <div>      
          <canvas id="myChart"></canvas>
          <canvas id="myChart2"></canvas>
        </div>
        
        {/* <Line data={data} options={config} /> */}
        <Line data={data2} />
      </div>
    </>
  );
};