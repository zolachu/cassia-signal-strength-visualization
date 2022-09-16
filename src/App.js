import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js";
import { Chart as ChartJS, Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import StreamingPlugin from "chartjs-plugin-streaming";
import moment from "moment";

import {
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

// ChartJS.pluginService.register(CategoryScale);
// Chart.register(StreamingPlugin);

// console.log(Chart.getChart());
// const Chart = require("react-chartjs-2").Chart;

const chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};

const options = {
  elements: {
    line: {
      tension: 0.5,
    },
  },
  scales: {},
  x: {
    type: "realtime",
    distribution: "linear",
    realtime: {
      onRefresh: function (chart) {
        chart.data.datasets[0].data.push({
          x: moment(),
          y: Math.random(),
        });
      },
      delay: 3000,
      time: {
        displayFormat: "h:mm",
      },
    },
    ticks: {
      displayFormats: 1,
      maxRotation: 0,
      minRotation: 0,
      stepSize: 1,
      maxTicksLimit: 30,
      minUnit: "second",
      source: "auto",
      autoSkip: true,
      callback: function (value) {
        return moment(value, "HH:mm:ss").format("mm:ss");
      },
    },
  },

  y: {
    ticks: {
      beginAtZero: true,
      max: 1,
    },
  },
};
// const color = Chart.helpers.color;

function App() {
  const chartRef = useRef(null);
  // const chart = chartRef.current.chartInstance;

  const [chartData, setChartData] = useState({
    datasets: [],
  });
  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      console.log("CanvasRenderingContext2D", chart.ctx);
      console.log("HTMLCanvasElement", chart.canvas);
    }
    // if (chart !== undefined) {
    //   console.log("hi");
    //   chart.destroy();
    // }
  }, []);

  useEffect(() => {
    const chart = chartRef.current;
    // if (chart !== undefined) chart.destroy();
    if (chart) {
      console.log("hi");
      setChartData({
        datasets: [
          {
            label: "Dataset 1 (linear interpolation)",
            backgroundColor: "rgb(153, 102, 255)",
            borderColor: chartColors.red,
            fill: false,
            lineTension: 0,
            borderDash: [8, 4],
            data: [],
          },
        ],
      });
    }
  }, []);

  return (
    <div className="App">
      <Line
        datasetIdKey="id"
        data={chartData}
        options={options}
        ref={chartRef}
      />
    </div>
  );
}

export default App;
