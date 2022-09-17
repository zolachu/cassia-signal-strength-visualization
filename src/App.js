import React, { useRef, useState, useCallback } from "react";
import "chartjs-plugin-streaming";
import ListDataComponent from "./components/ListDataComponent/ListDataComponent";
import ChartComponent from "./components/ChartComponent/ChartComponent";
import ElapsedTimer from "./components/UI/Timer";

import styles from "./App.module.css";

const App = () => {
  const [data, setData] = useState([]);
  const [timerStart, setTimerStart] = useState(false);
  const receiveDataHandler = useCallback((data) => {
    setData((prevData) => {
      // return [...prevData, ...data];
      return [...data];
    });
  }, []);

  const timerHandler = useCallback((timerStart) => {
    console.log("do something");
    setTimerStart((v) => !v);
  }, []);

  return (
    <div className={styles.border}>
      <div className={styles.grid}>
        <div className={styles.chart}>
          <ChartComponent
            onReceiveData={receiveDataHandler}
            onTimer={timerHandler}
          ></ChartComponent>
        </div>
        <ElapsedTimer timer={timerStart}></ElapsedTimer>
        <div className={styles.listData}>
          <ListDataComponent data={data}></ListDataComponent>
        </div>
      </div>
    </div>
  );
};

export default App;
