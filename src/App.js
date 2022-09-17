import React, { useRef, useState, useCallback } from "react";
import "chartjs-plugin-streaming";
import ListDataComponent from "./components/ListDataComponent/ListDataComponent";
import ChartComponent from "./components/ChartComponent/ChartComponent";

import styles from "./App.module.css";

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
      <ListDataComponent data={data}></ListDataComponent>
    </>
  );
};

export default App;
