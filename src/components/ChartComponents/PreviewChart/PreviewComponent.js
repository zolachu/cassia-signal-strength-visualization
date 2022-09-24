import React from "react";
import "chartjs-plugin-streaming";
import { Line, Bar, Box } from "react-chartjs-2";
import "chartjs-plugin-streaming";

import Chart from "react-chartjs-2";
import "chartjs-chart-box-and-violin-plot/build/Chart.BoxPlot.js";

const PreviewComponent = (props) => {
  // console.log(props.data.datasets[0].data[0], "<=== data");

  let arrayRSSI = [];
  if (props.data && props.data.datasets && props.data.datasets[0].data) {
    arrayRSSI = props.data.datasets[0].data.map((item) => item.y);
  }

  const boxplotData = {
    // define label tree
    labels: ["Rssi Sensor value"],
    datasets: [
      {
        label: "Dataset 1",
        backgroundColor: "rgba(255,0,0,0.5)",
        borderColor: "red",
        borderWidth: 1,
        outlierColor: "#999999",
        padding: 10,
        itemRadius: 0,
        data: arrayRSSI,
      },
    ],
  };

  console.log(arrayRSSI);
  const data = props.radioValue === "boxplot" ? boxplotData : props.data;
  const options =
    props.radioValue === "boxplot"
      ? {
          responsive: true,
          title: {
            display: true,
            text: "Box Plot Chart",
          },
        }
      : props.options;
  console.log(props.radioValue);
  const type = props.radioValue;
  return (
    <>
      <Chart
        type={type}
        height={200}
        datasetKeyProvider={props.datasetKeyProvider}
        // data={props.data}
        // options={props.options}
        data={data}
        options={options}
        // radioValue={radioValue}
      />
    </>
  );
};

export default PreviewComponent;
