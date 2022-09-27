import React from "react";
import "chartjs-plugin-streaming";
import Chart from "react-chartjs-2";
import "chartjs-chart-box-and-violin-plot/build/Chart.BoxPlot.js";
import { Chart as Chartjs } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
Chartjs.pluginService.register(annotationPlugin);

const PreviewComponent = (props) => {
  let options = props.options;
  let data = props.data;
  let arrayRSSI = [];

  if (props.data && props.data.datasets && props.data.datasets[0].data) {
    arrayRSSI = props.data.datasets[0].data.map((item) => item.y);
  }
  console.log(arrayRSSI);
  const boxplotData = {
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
        data: [arrayRSSI],
      },
    ],
  };

  console.log(props.radioValue);

  return (
    <>
      {props.radioValue === "line" && (
        <Chart
          type="line"
          height={200}
          datasetKeyProvider={props.datasetKeyProvider}
          data={data}
          options={options}
        />
      )}
      {props.radioValue === "bar" && (
        <Chart
          type="bar"
          height={200}
          datasetKeyProvider={props.datasetKeyProvider}
          data={data}
          options={options}
        />
      )}
      {props.radioValue === "boxplot" && (
        <Chart
          type="boxplot"
          height={200}
          datasetKeyProvider={props.datasetKeyProvider}
          data={boxplotData}
          options={{
            responsive: true,
            title: {
              display: true,
              text: "Chart.js Box Plot Chart",
            },
          }}
        />
      )}
    </>
  );
};

export default PreviewComponent;
