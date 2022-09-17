import React, { useRef, useState } from "react";
import "chartjs-plugin-streaming";
import Button from "./components/UI/Button";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import config from "./components/chartConfig/config";
import DataPoints from "./components/data/DataPoints";

const App = () => {
  const toggleRef = useRef(false);
  const chartRef = useRef();
  const arrayRef = useRef([]);
  let copyArr = [];
  const clickHandler = () => {
    toggleRef.current = !toggleRef.current;
    copyArr = [...arrayRef.current];
  };

  //chart component
  const [chartColors, datasetKeyProvider, onFresh, color] = config;

  const chart = (
    <Line
      ref={chartRef}
      datasetKeyProvider={datasetKeyProvider}
      data={{
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
      }}
      options={{
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
      }}
    />
  );
  return (
    <>
      <div>{chart}</div>
      {/* <ChartComponent ref={toggleRef}></ChartComponent> */}
      <Button text="aa" onClick={clickHandler} />
      <DataPoints array={[...arrayRef.current]}>""</DataPoints>
    </>
  );
};

export default App;
