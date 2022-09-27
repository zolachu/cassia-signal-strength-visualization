import React from "react";
import "chartjs-plugin-streaming";
import config from "../../chartConfig/configPreview";
import PreviewComponent from "./PreviewComponent";

import styles from "./PreviewChartComponent.module.css";

const PreviewChartComponent = (props) => {
  //chart component
  const [radioValue, setRadioValue] = React.useState("line");
  const [chartColors, datasetKeyProvider, options] = config;
  // if (!props.data) return <></>;

  let labels = [];
  let distance = null;
  let macAddress = null;

  if (props.data && props.data[0]) {
    labels = props.data.map((element) => element.x);
    distance = props.data[0].distance;
    macAddress = props.data[0].devicemac;
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
    console.log(event.target.value);
    setRadioValue(event.target.value);
  };

  return (
    <div>
      <input
        type="radio"
        value="bar"
        name="chartType"
        onChange={changeChartTypeHandler}
        checked={"bar" === radioValue}
      />
      Bar
      <input
        type="radio"
        value="line"
        name="chartType"
        onChange={changeChartTypeHandler}
        checked={"line" === radioValue}
      />
      Line
      <input
        type="radio"
        value="boxplot"
        name="chartType"
        checked={"boxplot" === radioValue}
        onChange={changeChartTypeHandler}
      />
      BoxPlot
      <h4>Distance: {distance}</h4>
      <h4>Mac Address: {macAddress}</h4>
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

export default PreviewChartComponent;
