import React from "react";
import "chartjs-plugin-streaming";
import { Line, Bar } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import config from "../../chartConfig/configPreview";
import PreviewComponent from "./PreviewComponent";

import styles from "./PreviewChartComponent.module.css";

const PreviewChartComponent = (props) => {
  //chart component
  const [radioValue, setRadioValue] = React.useState("Bar");
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
        // fill: true,
        backgroundColor: chartColors.red,
        borderColor: chartColors.pink,
        segment: {},
      },
    ],
  };

  const changeValueHandler = (event) => {
    setRadioValue(event.target.value);
  };

  return (
    <div>
      <div onChange={changeValueHandler}>
        <input
          type="radio"
          value="Bar"
          name="chartType"
          defaultChecked={"Bar" === radioValue}
        />
        Bar
        {/* <input type="radio" value="Area" name="chartType" /> Female */}
        <input
          type="radio"
          value="Line"
          name="chartType"
          defaultChecked={"Line" === radioValue}
        />
        Line
      </div>
      <h4>Distance : {distance}</h4>
      <div className={styles.container}>
        <PreviewComponent
          datasetKeyProvider={datasetKeyProvider}
          data={data}
          options={options}
          radioValue={radioValue}
        />
      </div>
    </div>
  );
};

export default React.memo(PreviewChartComponent);
