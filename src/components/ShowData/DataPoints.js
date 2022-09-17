import React, { useState } from "react";

const DataPoints = (props) => {
  // const useState(ref.current);
  console.log(props.data);
  const list = props.data.map((point) => {
    console.log(point, " <=== point");
    return (
      <li>
        {point.x} {point.y}
      </li>
    );
  });
  return (
    <>
      <ul>{list}</ul>
    </>
  );
};

export default DataPoints;
