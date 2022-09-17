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

  const clickToggleHandler = () => {
    toggleRef.current = !toggleRef.current;

    props.onReceiveData(arrayRef.current, toggleRef.current);
  };

  const changeInputHandler = () => {};

  //chart component
  const [chartColors, datasetKeyProvider, onFresh] = config;

  const data = {
    datasets: [
      {
        label: "Sensor Data",
        data: [],
        fill: true,
        backgroundColor: chartColors.green,
        borderColor: chartColors.green,
        segment: {},
      },
    ],
  };

  const options = {
    plugins: {
      streaming: {
        frameRate: 5, // chart is drawn 5 times every second
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
          type: "realtime",
          realtime: {
            onRefresh: onFresh.bind(
              null,
              toggleRef,
              arrayRef,
              props.shouldStop
            ),
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
      <div className="actions">
        <ToggleButton onClick={clickToggleHandler} disable={props.shouldStop} />
        <input onChange={changeInputHandler} type="number" placeholder="0" />
      </div>
    </div>
  );
};

export default React.memo(ChartComponent);
