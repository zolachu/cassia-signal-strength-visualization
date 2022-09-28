import React from "react";
import "chartjs-plugin-streaming";
import config from "../../chartConfig/configPreview";
import PreviewComponent from "./PreviewComponent";

import styles from "./PreviewChartComponent.module.css";
import SmallCard from "../../UI/SmallCard/SmallCard";

const PreviewChartComponent = (props) => {
  //chart component
  const [radioValue, setRadioValue] = React.useState("line");
  const [chartColors, datasetKeyProvider, options] = config;
  // if (!props.data) return <></>;

  let labels = [];
  let distance = null;
  let macAddress = null;
  let tag = null;

  if (props.data && props.data[0]) {
    labels = props.data.map((element) => element.x);
    distance = props.data[0].distance;
    macAddress = props.data[0].devicemac;
    tag = props.data[0].tag;
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Distance",
        textColor: "red",
        data: props.data,
        // fill: true,
        backgroundColor: "rgba(255, 10, 13, 0.3)",
        borderColor: chartColors.red,
        borderWidth: 2,
        borderRadius: 10,
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
      <h4>Tag: {tag}</h4>
      <SmallCard className={styles.container}>
        <PreviewComponent
          datasetKeyProvider={datasetKeyProvider}
          data={data}
          options={options}
          radioValue={radioValue}
        />
      </SmallCard>
    </div>
  );
};

export default PreviewChartComponent;
