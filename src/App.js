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
    <div className={styles.border}>
      <div className={styles.grid}>
        <div className={styles.chart}>
          <ChartComponent onReceiveData={receiveDataHandler}></ChartComponent>
        </div>
        <div className={styles.listData}>
          <ListDataComponent data={data}></ListDataComponent>
        </div>
      </div>
    </div>
  );
};

export default App;
