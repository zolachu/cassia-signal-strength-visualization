import React, { useRef, useEffect } from "react";
import "chartjs-plugin-streaming";
import RecordButton from "../../UI/RecordButton";
import { Bar, Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import config from "../../chartConfig/configLine";
import TextField from "@mui/material/TextField";

import styles from "./BarChartComponent.module.css";

const ChartComponent = (props) => {
  console.log("should still render");
  const toggleRef = useRef(false);
  const chartRef = useRef();
  const arrayOfRecordedDataRef = useRef([[]]);
  const inputRef = useRef(0);

  const clickToggleHandler = (shouldRecord) => {
    toggleRef.current = shouldRecord;
    props.onReceiveData(arrayOfRecordedDataRef.current, toggleRef.current);
  };

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
            delay: 8000,
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
          <TextField
            id="inputDistance"
            label="Distance"
            variant="outlined"
            type="number"
            placeholder="distance in feet"
            inputRef={inputRef}
            disabled={props.shouldStop}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChartComponent);
