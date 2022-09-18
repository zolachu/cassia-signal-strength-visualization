import React from "react";
import styles from "./ListDataComponent.module.css";
import SingleDataComponent from "../SingleDataComponent/SingleDataComponent";
import DataStats from "../DataStatsComponent/DataStatsComponent";

const DataPoints = (props) => {
  const list = props.dataArray.map((data) => {
    return (
      <SingleDataComponent
        data={data}
        key={Math.random()}
      ></SingleDataComponent>
    );
  });

  return <ul>{list}</ul>;
};

export default DataPoints;
