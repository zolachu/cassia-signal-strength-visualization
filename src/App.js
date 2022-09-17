import React, { useRef, useState, useCallback } from "react";
import "chartjs-plugin-streaming";
import ListDataComponent from "./components/ListDataComponent/ListDataComponent";
import ChartComponent from "./components/ChartComponents/LineChartComponent";
import ElapsedTimer from "./components/UI/Timer";
import ToggleButton from "./components/UI/ToggleButton";
import Card from "./components/UI/Card/Card";
import BarChartComponent from "./components/ChartComponents/BarChartComponent";

import styles from "./App.module.css";

const App = () => {
  const [data, setData] = useState([]);
  const [timerStart, setTimerStart] = useState(false);
  const [stop, setStop] = useState(true);

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
    <div className={styles.app}>
      <div className={styles.border}>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <Card className={styles.closeLiveChart}>
              <button className={styles.stopButton} onClick={stopButtonHandler}>
                {stopButtonName}
              </button>
            </Card>
            <Card className={styles.chart}>
              <ChartComponent
                onReceiveData={receiveDataHandler}
                shouldStop={stop}
              ></ChartComponent>
            </Card>

            <Card className={styles.timerContainer}>
              <div className={styles.timerCircle}>
                <ElapsedTimer
                  timer={timerStart}
                  shouldStop={stop}
                ></ElapsedTimer>
              </div>
            </Card>
          </div>

          <div className={styles.rightContainer}>
            <Card className={styles.listData}>
              <ListDataComponent data={data}></ListDataComponent>
            </Card>

            <Card className={styles.barChart}>
              <BarChartComponent data={data} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
