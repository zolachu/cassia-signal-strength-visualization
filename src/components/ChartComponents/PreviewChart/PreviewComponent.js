import React from "react";
import "chartjs-plugin-streaming";
import { Line, Bar, Box } from "react-chartjs-2";
import "chartjs-plugin-streaming";

import Chart from "react-chartjs-2";
// import "chartjs-chart-box-and-violin-plot/build/Chart.BoxPlot.js";

const PreviewComponent = (props) => {
  return (
    <>
      <Chart
        type={props.radioValue}
        height={200}
        datasetKeyProvider={props.datasetKeyProvider}
        data={props.data}
        options={props.options}
      />
    </>
  );
};

export default PreviewComponent;
