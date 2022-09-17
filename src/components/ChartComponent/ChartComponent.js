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

  console.log(props.shouldStop, " ... shoould stop");

  const clickToggleHandler = () => {
    toggleRef.current = !toggleRef.current;

    props.onReceiveData(arrayRef.current, toggleRef.current);
    // props.onTimer(toggleRef.current);
    // if (inputRef.current > 0 && !toggleRef.current) {
    //   toggleRef.current = true;
    //   setTimeout(() => {
    //     toggleRef.current = false;
    //   }, inputRef.current * 1000);
    // }
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
        backgroundColor: chartColors.blue,
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
        <ToggleButton onClick={clickToggleHandler} />
        <input onChange={changeInputHandler} type="number" placeholder="0" />
      </div>
    </div>
  );
};

export default React.memo(ChartComponent);
