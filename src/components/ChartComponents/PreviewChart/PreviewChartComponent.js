import React from "react";
import "chartjs-plugin-streaming";
import config from "../../chartConfig/configPreview";
import PreviewComponent from "./PreviewComponent";

import styles from "./PreviewChartComponent.module.css";

const PreviewChartComponent = (props) => {
  //chart component
  const [radioValue, setRadioValue] = React.useState("bar");
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

  const changeChartTypeHandler = (event) => {
    setRadioValue(event.target.value);
  };

  return (
    <div>
      <div onChange={changeChartTypeHandler}>
        <input
          type="radio"
          value="bar"
          name="chartType"
          defaultChecked={"bar" === radioValue}
        />
        Bar
        {/* <input type="radio" value="Area" name="chartType" /> Female */}
        <input
          type="radio"
          value="line"
          name="chartType"
          defaultChecked={"line" === radioValue}
        />
        Line
        <input type="radio" value="boxplot" name="chartType" />
        BoxPlot
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
