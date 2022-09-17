import ChartComponent from "./components/chart";
import React, { useRef, useState } from "react";
import "chartjs-plugin-streaming";
import Button from "./components/UI/Button";

const App = () => {
  const toggleRef = useRef(null);

  const clickHandler = () => {
    toggleRef.current = !toggleRef.current;
    console.log(toggleRef.current);
  };

  return (
    <>
      <ChartComponent ref={toggleRef}></ChartComponent>
      <Button text="aa" onClick={clickHandler} />
    </>
  );
};

export default App;
