import React, { useRef, useState, useMemo } from "react";
import { Line, Chart } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import moment from "moment";

var chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};
var color = Chart.helpers.color;

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

const ChartComponent = React.forwardRef((props, ref) => {
  const chartRef = useRef();

  console.log("app running");
  //   const toggle = useRef(false);

  const timerHandler = (e) => {
    // toggle.current = !toggle.current;
    // console.log(getElementAtEvent(chartRef.current, e));
  };
  //   const buttonName = !toggle ? "Start" : "end";
  // console.log(chartRef.current.chartInstance);
  //   console.log("ref value is ", ref.current);
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
              fill: true,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: chartColors.red,
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
                  onRefresh: onFresh,
                  delay: 2000,
                },
              },
            ],
            yAxes: [{}],
          },
        }}
      />
    </div>
  );
});

export default React.memo(ChartComponent);
