import React, { useRef } from "react";
import "chartjs-plugin-streaming";
import ToggleButton from "../UI/ToggleButton";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import config from "../chartConfig/config";

import styles from "./ChartComponent.module.css";

const ChartComponent = (props) => {
  const toggleRef = useRef(false);
  const chartRef = useRef();
  const arrayRef = useRef([]);

  const clickHandler = () => {
    toggleRef.current = !toggleRef.current;
    props.onReceiveData(arrayRef.current);
  };

  //chart component
  const [chartColors, datasetKeyProvider, onFresh, color] = config;

  const data = {
    datasets: [
      {
        label: "Sensor Data",
        data: [],
        fill: true,
        backgroundColor: chartColors.red,
        borderColor: "rgb(75, 192, 192)",
        segment: {},
      },
    ],
  };

  const options = {
    plugins: {
      streaming: {
        frameRate: 5, // chart is drawn 5 times every second
      },
    },
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            onRefresh: onFresh.bind(null, toggleRef, arrayRef),
            delay: 2000,
          },
        },
      ],
      yAxes: [{}],
    },
  };

  return (
    <div>
      <div className={styles["chart-container"]}>
        <Line
          ref={chartRef}
          datasetKeyProvider={datasetKeyProvider}
          data={data}
          options={options}
        />
      </div>
      <div>
        <ToggleButton onClick={clickHandler} />
      </div>
    </div>
  );
};

export default React.memo(ChartComponent);
