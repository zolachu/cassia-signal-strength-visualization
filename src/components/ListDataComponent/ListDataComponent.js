import React from "react";
import styles from "./ListDataComponent.module.css";
import SingleDataComponent from "../SingleDataComponent/SingleDataComponent";

const DataPoints = (props) => {
  const fivesData = props.data.filter((point) => point.distance === 5);

  let sum = 0;
  const arrayY = [];
  const list = props.data.map((point) => {
    sum += point.y;
    arrayY.push(point.y);
    const pointXY = `${new Date(point.x)} ${point.y} ${point.distance}`;
    return (
      <SingleDataComponent
        key={Math.random()}
        point={point}
      ></SingleDataComponent>
    );
  });

  const min = arrayY.length > 0 ? Math.max(...arrayY) : 0;
  const max = arrayY.length > 0 ? Math.min(...arrayY) : 0;
  const average =
    arrayY.length > 0 ? arrayY.reduce((a, b) => a + b, 0) / arrayY.length : 0;
  average.toFixed(4);
  const count = arrayY.length > 0 ? arrayY.length : 0;
  return (
    <div>
      <div>MIN: {min}</div>
      <div>MAX: {max}</div>
      <div>AVERAGE: {average.toFixed(2)}</div>
      <div>COUNT: {count}</div>
      <ul>{list}</ul>
    </div>
  );
};

export default DataPoints;
