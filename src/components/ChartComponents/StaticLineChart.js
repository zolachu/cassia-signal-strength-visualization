import React, { useRef } from "react";
import "chartjs-plugin-streaming";
import { Line } from "react-chartjs-2";
import config from "../chartConfig/configLine";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const StaticLineChart = (props) => {
  console.log(props.data);
  const data = {
    datasets: [
      {
        label: "Dataset 1",
        data: props.data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default StaticLineChart;
