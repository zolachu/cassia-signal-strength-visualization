import React from "react";
import "chartjs-plugin-streaming";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import config from "../chartConfig/configBar";

import styles from "./BarChartComponent.module.css";

const BarChartComponent = (props) => {
  //chart component
  const [chartColors, datasetKeyProvider, findDistinctElements] = config;
  if (!props.data) return <></>;
  let distinctData = [];
  let labels = [];
  if (props.data) {
    labels = props.data.map((element) => element.x);
    console.log(distinctData);
    console.log(labels);
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Distance",
        data: props.data,
        fill: true,
        backgroundColor: chartColors.red,
        borderColor: chartColors.red,
        segment: {},
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      streaming: {
        // frameRate: 5, // chart is drawn 5 times every second
      },
      legend: {
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 14,
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
          scaleLabel: {
            display: true,
            labelString: "Timeline",
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value) {
              const d = new Date(value);
              return `${d.getMinutes()}:${d.getSeconds()}`;
            },
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

  return (
    <div>
      <div className={styles["chart-container"]}>
        <Line
          datasetKeyProvider={datasetKeyProvider}
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default React.memo(BarChartComponent);
