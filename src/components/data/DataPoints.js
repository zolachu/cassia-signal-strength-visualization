import React, { useState } from "react";

const DataPoints = React.forwardRef((props, ref) => {
  // const useState(ref.current);
  console.log("called");
  return (
    <>
      {/* {props.array.current.length} */}
      {props.children}
    </>
  );
});

export default DataPoints;
