import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import "./App.css";
import moment from "moment";

const onFresh = async (chart) => {
  try {
    const response = await fetch(
      "https://random-data-api.com/api/users/random_user"
    );
    if (!response.ok) {
      console.log("error! with request");
    }
    const data = await response.json();
    // console.log(data);
    chart.data.datasets.forEach(function (dataset) {
      dataset.data.push({
        x: Date.now(),

        y: data.id % 100,
      });
    });
  } catch (error) {
    console.log("error ", error);
  }
};
const datasetKeyProvider = () => {
  return (Math.random() + 1).toString(36).substring(0, 12);
};

const App = () => {
  const chartRef = useRef();

  const timerHandler = (e) => {
    // console.log(getElementAtEvent(chartRef.current, e));
  };
  return (
    <div>
      <Line
        ref={chartRef}
        datasetKeyProvider={datasetKeyProvider}
        data={{
          datasets: [
            {
              label: "Sensor Data",
              data: [],
              fill: {
                target: "1",
                above: "rgb(255, 0, 0)", // Area will be red above the origin
                below: "rgb(0, 0, 255)", // And blue below the origin
              },
            },
          ],
        }}
        options={{
          plugins: {
            filler: {
              propagate: true,
            },
          },

          scales: {
            xAxes: [
              {
                type: "realtime",
                realtime: {
                  onRefresh: onFresh,
                  delay: 2000,
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  min: 0,
                  max: 10,
                },
              },
            ],
          },
        }}
      />
      <button onClick={timerHandler}>Start Timer</button>
    </div>
  );
};

export default App;
