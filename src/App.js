import React, { useRef, useState, useCallback } from "react";
import "chartjs-plugin-streaming";
import ListDataComponent from "./components/ListDataComponent/ListDataComponent";
import ChartComponent from "./components/ChartComponent/ChartComponent";
import ElapsedTimer from "./components/UI/Timer";

import styles from "./App.module.css";

const App = () => {
  const [data, setData] = useState([]);
  const [timerStart, setTimerStart] = useState(false);
  const [stop, setStop] = useState(false);

  const receiveDataHandler = useCallback((data, timerStart) => {
    setData((prevData) => {
      // return [...prevData, ...data];
      return [...data];
    });

    setTimerStart(timerStart);
  }, []);

  const stopButtonHandler = useCallback(() => {
    setStop((v) => !v);
  }, []);

  const stopButtonName = stop ? "START FETCHING DATA" : "STOP FETCHING DATA";

  return (
    <div className={styles.border}>
      <div className={styles.grid}>
        <div>
          <button onClick={stopButtonHandler}>{stopButtonName}</button>
        </div>
        <div className={styles.chart}>
          <ChartComponent
            onReceiveData={receiveDataHandler}
            shouldStop={stop}
          ></ChartComponent>
        </div>
        <div className={styles.timerContainer}>
          <div className={styles.timerCircle}>
            <ElapsedTimer timer={timerStart}></ElapsedTimer>
          </div>
        </div>

        <div className={styles.listData}>
          <ListDataComponent data={data}></ListDataComponent>
        </div>
      </div>
    </div>
  );
};

export default App;
