import React, { useState } from "react";

const DataPoints = (props) => {
  let sum = 0;
  const arrayY = [];
  const list = props.data.map((point) => {
    console.log(point, " <=== point");
    sum += point.y;
    arrayY.push(point.y);
    const pointXY = `${new Date(point.x)} ${point.y}`;
    return <li key={Math.random()}>{pointXY}</li>;
  });

  const min = arrayY.length > 0 ? Math.max(...arrayY) : 0;
  const max = arrayY.length > 0 ? Math.min(...arrayY) : 0;
  const average =
    arrayY.length > 0 ? arrayY.reduce((a, b) => a + b, 0) / arrayY.length : 0;
  const count = arrayY.length > 0 ? arrayY.length : 0;
  return (
    <>
      <div>MIN: {min}</div>
      <div>MAX: {max}</div>
      <div>AVERAGE: {average}</div>
      <div>COUNT: {count}</div>
      <ul>{list}</ul>
    </>
  );
};

export default DataPoints;
