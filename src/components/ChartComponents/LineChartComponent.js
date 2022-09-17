import React, { useRef } from "react";
import "chartjs-plugin-streaming";
import ToggleButton from "../UI/ToggleButton";
import { Bar, Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import config from "../chartConfig/configLine";

import styles from "./LineChartComponent.module.css";

const ChartComponent = (props) => {
  const toggleRef = useRef(false);
  const chartRef = useRef();
  const arrayRef = useRef([]);
  const inputRef = useRef(0);

  const clickToggleHandler = () => {
    toggleRef.current = !toggleRef.current;
    props.onReceiveData(arrayRef.current, toggleRef.current);
    console.log(inputRef.current.value);
  };

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
          type: "realtime",
          realtime: {
            onRefresh: onFresh.bind(
              null,
              toggleRef,
              arrayRef,
              props.shouldStop,
              inputRef
            ),

            duration: 2000,
            refresh: 400,
            delay: 2000,
          },
        },
      ],
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
        <Line
          ref={chartRef}
          datasetKeyProvider={datasetKeyProvider}
          data={data}
          options={options}
        />
      </div>
      <div className="actions">
        <ToggleButton onClick={clickToggleHandler} disable={props.shouldStop} />
        <label htmlFor="inputDistance">Distance</label>
        <input
          type="number"
          // placeholder="distance in feet"
          id="inputDistance"
          ref={inputRef}
          disabled={props.shouldStop}
        />
      </div>
    </div>
  );
};

export default React.memo(ChartComponent);
