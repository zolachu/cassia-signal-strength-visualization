// import React, { useEffect, useRef, useState } from "react";
// import { Chart as ChartJS } from "chart.js";
// import { Chart } from "react-chartjs-2";
// import "chartjs-plugin-streaming";
// import "chartjs-adapter-luxon";
// import { StreamingPlugin, RealTimeScale } from "chartjs-plugin-streaming";
// import ChartStreaming from "chartjs-plugin-streaming";
// import moment from "moment";
// import { CategoryScale } from "chart.js";
// import { registerables } from "chart.js";
// ChartJS.register(...registerables);
// ChartJS.register(StreamingPlugin);
// // ChartJS.register(CategoryScale);
// ChartJS.register(ChartStreaming, RealTimeScale, CategoryScale, StreamingPlugin);

// const chartColors = {
//   red: "rgb(255, 99, 132)",
//   orange: "rgb(255, 159, 64)",
//   yellow: "rgb(255, 205, 86)",
//   green: "rgb(75, 192, 192)",
//   blue: "rgb(54, 162, 235)",
//   purple: "rgb(153, 102, 255)",
//   grey: "rgb(201, 203, 207)",
// };

// const options = {
//   elements: {
//     line: {
//       tension: 0.5,
//     },
//   },
//   scales: {
//     xAxis: [
//       {
//         type: "realtime",
//         distribution: "linear",
//         realtime: {
//           onRefresh: function (chart) {
//             chart.data.datasets[0].data.push({
//               x: moment(),
//               y: Math.random(),
//             });
//           },
//           delay: 3000,
//           time: {
//             displayFormat: "h:mm",
//           },
//         },
//         ticks: {
//           displayFormats: 1,
//           maxRotation: 0,
//           minRotation: 0,
//           stepSize: 1,
//           maxTicksLimit: 30,
//           minUnit: "second",
//           source: "auto",
//           autoSkip: true,
//           callback: function (value) {
//             return moment(value, "HH:mm:ss").format("mm:ss");
//           },
//         },
//       },
//     ],

//     yAxis: [
//       {
//         ticks: {
//           beginAtZero: true,
//           max: 1,
//         },
//       },
//     ],
//   },
// };
// // const color = Chart.helpers.color;

// function App() {
//   const chartRef = useRef(null);
//   // const chart = chartRef.current.chartInstance;

//   if (chartRef.current) {
//     if (chartRef.current.chart) {
//       console.log(chartRef.current.chart);
//       chartRef.current.chart.destroy();
//     }
//   }

//   const [chartData, setChartData] = useState({
//     datasets: [],
//   });
//   useEffect(() => {
//     const chart = chartRef.current;

//     if (chart) {
//       console.log("CanvasRenderingContext2D", chart.ctx);
//       console.log("HTMLCanvasElement", chart.canvas);
//     }
//     // if (chart !== undefined) {
//     //   console.log("hi");
//     //   chart.destroy();
//     // }
//   }, []);

//   useEffect(() => {
//     const chart = chartRef.current;
//     // if (chart !== undefined) chart.destroy();

//     if (chart) {
//       console.log("hi");
//       setChartData({
//         datasets: [
//           {
//             label: "Dataset 1 (linear interpolation)",
//             backgroundColor: "rgb(153, 102, 255)",
//             borderColor: chartColors.red,
//             fill: false,
//             lineTension: 0,
//             borderDash: [8, 4],
//             data: [],
//           },
//         ],
//       });
//       // chartRef.current.update();
//     }
//   }, []);

//   return (
//     <div className="App">
//       <Chart
//         type="line"
//         datasetIdKey="id"
//         data={chartData}
//         options={options}
//         ref={chartRef}
//       />
//     </div>
//   );
// }

// export default App;

import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import "./App.css";

const onFresh = (chart) => {
  chart.data.datasets.forEach(function (dataset) {
    dataset.data.push({
      x: Date.now(),

      y: Math.random(),
    });
  });
};

const App = () => {
  // render() {
  return (
    <Line
      data={{
        datasets: [
          {
            data: [],
          },
          {
            data: [],
          },
        ],
      }}
      options={{
        scales: {
          xAxes: [
            {
              type: "realtime",
              realtime: {
                onRefresh: onFresh,
                delay: 2000,
              },
            },
          ],
        },
      }}
    />
  );
  // }
};

export default App;
