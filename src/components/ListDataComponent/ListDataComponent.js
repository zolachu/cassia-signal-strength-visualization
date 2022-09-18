import React from "react";
import styles from "./ListDataComponent.module.css";
import SingleDataComponent from "../SingleDataComponent/SingleDataComponent";
import DataStats from "../DataStatsComponent/DataStatsComponent";

const DataPoints = (props) => {
  const arrayY = [];
  const list = props.data.map((point) => {
    arrayY.push(point.y);

    return (
      <SingleDataComponent
        key={Math.random()}
        point={point}
      ></SingleDataComponent>
    );
  });

  return (
    <div>
      <DataStats array={arrayY} timer={props.timer}></DataStats>
      <ul>{list}</ul>
    </div>
  );
};

export default DataPoints;
