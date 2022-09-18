import React, { useRef } from "react";
import { Line } from "react-chartjs-2";

const options = {
  //   responsive: true,

  plugins: {
    legend: {
      labels: {
        // This more specific font property overrides the global property
        font: {
          size: 20,
        },
      },
    },
  },
  title: {
    display: true,
    text: "Sensor Data",
  },
  scales: {
    xAxes: [
      {
        type: "time",
        title: {
          display: true,
          text: "Date",
        },
      },
    ],
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "Signal Strength",
        },

        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value) {
            return "-" + value;
          },

          min: 0,
          max: 250,
        },
      },
    ],
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
