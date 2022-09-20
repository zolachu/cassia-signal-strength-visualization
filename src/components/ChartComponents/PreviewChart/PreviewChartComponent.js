import React from "react";
import "chartjs-plugin-streaming";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import config from "../../chartConfig/configPreview";

import styles from "./PreviewChartComponent.module.css";

const PreviewChartComponent = (props) => {
  //chart component
  const [chartColors, datasetKeyProvider, options] = config;
  // if (!props.data) return <></>;

  let labels = [];
  let distance = null;

  if (props.data && props.data[0]) {
    labels = props.data.map((element) => element.x);
    distance = props.data[0].distance;
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Distance",
        data: props.data,
        fill: true,
        backgroundColor: chartColors.red,
        borderColor: chartColors.red,
        segment: {},
      },
    ],
  };

  return (
    <div>
      <h4>Distance : {distance}</h4>
      <div className={styles.container}>
        <Line
          height="200"
          datasetKeyProvider={datasetKeyProvider}
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default React.memo(PreviewChartComponent);
