import React, { useRef } from "react";
import "chartjs-plugin-streaming";
import ToggleButton from "../UI/ToggleButton";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import config from "../chartConfig/configBar";

import styles from "./LineChartComponent.module.css";

const BarChartComponent = (props) => {
  //chart component
  const [chartColors, datasetKeyProvider, findDistinctElements] = config;

  console.log(props.data.length);
  const arrayY = props.data.map((item) => item.y);
  console.log(arrayY);

  const map = findDistinctElements(arrayY);
  console.log(map);

  const labels = ["January", "February", "March", "April", "May", "June"];
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
      xAxes: [{}],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Signal Strength",
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
