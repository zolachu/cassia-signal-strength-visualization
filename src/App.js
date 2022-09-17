import React, { useRef, useState, useCallback } from "react";
import "chartjs-plugin-streaming";
import DataPoints from "./components/ShowData/DataPoints";
import ChartComponent from "./components/ChartComponent";

const App = () => {
  const [data, setData] = useState([]);
  const receiveDataHandler = useCallback((data) => {
    console.log(data);

    setData((prevData) => {
      // return [...prevData, ...data];
      return [...data];
    });
  }, []);
  return (
    <>
      <ChartComponent onReceiveData={receiveDataHandler}></ChartComponent>
      <DataPoints data={data}></DataPoints>
    </>
  );
};

export default App;
