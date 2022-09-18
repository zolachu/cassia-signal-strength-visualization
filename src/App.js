import React, { useRef, useState, useCallback } from "react";
import "chartjs-plugin-streaming";
import ListDataComponent from "./components/ListDataComponent/ListDataComponent";
import ChartComponent from "./components/ChartComponents/LineChartComponent";
import ElapsedTimer from "./components/UI/Timer";
import ToggleButton from "./components/UI/RecordButton";
import Card from "./components/UI/Card/Card";
import BarChartComponent from "./components/ChartComponents/BarChartComponent";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseIcon from "@mui/icons-material/Pause";

import styles from "./App.module.css";

const App = () => {
  const [data, setData] = useState([]);
  const [timerStart, setTimerStart] = useState(false);
  const [stopFetching, setStopFetching] = useState(true);

  const receiveDataHandler = useCallback((data, timerStart) => {
    setData((prevData) => {
      // return [...prevData, ...data];
      return [...data];
    });

    setTimerStart(timerStart);
  }, []);

  const stopButtonHandler = useCallback(() => {
    setStopFetching((v) => !v);
  }, []);

  const stopButtonName = stopFetching
    ? "START FETCHING DATA"
    : "STOP FETCHING DATA";

  return (
    <div className={styles.app}>
      <div className={styles.border}>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <div className={styles.closeLiveChart}>
              <button className={styles.stopButton} onClick={stopButtonHandler}>
                {stopButtonName}
                {stopFetching && (
                  <PlayCircleFilledIcon className={styles.closeButton} />
                )}
                {!stopFetching && <PauseIcon />}
              </button>
            </div>
            <Card className={styles.chart}>
              <ChartComponent
                onReceiveData={receiveDataHandler}
                shouldStop={stopFetching}
              ></ChartComponent>
            </Card>

            <div className={styles.timerContainer}>
              <div className={styles.timerCircle}>
                <ElapsedTimer
                  timer={timerStart}
                  shouldStop={stopFetching}
                ></ElapsedTimer>
              </div>
            </div>
          </div>

          <div className={styles.rightContainer}>
            <Card className={styles.listData}>
              <ListDataComponent
                data={data}
                timer={timerStart}
              ></ListDataComponent>
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
