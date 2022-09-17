import React from "react";
import "chartjs-plugin-streaming";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import config from "../chartConfig/configBar";

import styles from "./BarChartComponent.module.css";

const BarChartComponent = (props) => {
  //chart component
  const [chartColors, datasetKeyProvider, findDistinctElements] = config;

  const arrayY = props.data.map((item) => item.y);

  const map = findDistinctElements(arrayY);
  console.log(map);

  const distinctData = Array.from(map.values());
  const labels = Array.from(map.keys());
  console.log(distinctData);
  console.log(labels);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Distance",
        data: distinctData,
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
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Frequency",
          },
        },
      ],
    },
  };

  return (
    <div>
      <div className={styles["chart-container"]}>
        <Bar
          datasetKeyProvider={datasetKeyProvider}
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default React.memo(BarChartComponent);
