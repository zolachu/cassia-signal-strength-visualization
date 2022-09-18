import React from "react";
import styles from "./ListDataComponent.module.css";
import SingleDataComponent from "../SingleDataComponent/SingleDataComponent";
import DataStats from "../DataStatsComponent/DataStatsComponent";

const DataPoints = (props) => {
  const arrayY = [];

  const distance = props.data.length > 0 ? props.data[0].distance : undefined;
  const list = props.data.map((point) => {
    arrayY.push(point.y);

    return (
      <SingleDataComponent
        onClick={props.onClick}
        key={Math.random()}
        point={point}
      ></SingleDataComponent>
    );
  });

  return (
    <div>
      <DataStats
        array={arrayY}
        timer={props.timer}
        distance={distance}
      ></DataStats>
      <ul>{list}</ul>
    </div>
  );
};

export default DataPoints;
