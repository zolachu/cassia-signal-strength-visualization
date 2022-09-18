import React, { useRef } from "react";
import "chartjs-plugin-streaming";
import RecordButton from "../UI/RecordButton";
import { Bar, Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import config from "../chartConfig/configLine";

import styles from "./LineChartComponent.module.css";

const ChartComponent = (props) => {
  console.log("should still render");
  const toggleRef = useRef(false);
  const chartRef = useRef();
  const arrayOfRecordedDataRef = useRef([[]]);
  const inputRef = useRef(0);

  const clickToggleHandler = () => {
    toggleRef.current = !toggleRef.current;
    props.onReceiveData(arrayOfRecordedDataRef.current, toggleRef.current);
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
    events: [],
    plugins: {
      streaming: {
        // frameRate: 5, // chart is drawn 5 times every second
      },
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
          type: "realtime",
          realtime: {
            onRefresh: onFresh.bind(
              null,
              toggleRef,
              arrayOfRecordedDataRef,
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
          ref={chartRef}
          datasetKeyProvider={datasetKeyProvider}
          data={data}
          options={options}
        />
      </div>
      <div className="actions">
        <div>
          <RecordButton
            onClick={clickToggleHandler}
            disable={props.shouldStop}
          />
          <label htmlFor="inputDistance">Distance</label>
          <input
            type="number"
            placeholder="distance in feet"
            id="inputDistance"
            ref={inputRef}
            disabled={props.shouldStop}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChartComponent);
