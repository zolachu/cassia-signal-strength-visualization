import React, { useRef, useState, useCallback } from "react";
import "chartjs-plugin-streaming";
import ListDataComponent from "./components/ListDataComponent/ListDataComponent";
import ChartComponent from "./components/ChartComponents/LineChartComponent";
import ElapsedTimer from "./components/UI/Timer";
import Card from "./components/UI/Card/Card";
import BarChartComponent from "./components/ChartComponents/BarChartComponent";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseIcon from "@mui/icons-material/Pause";
import Button from "@mui/material/Button";
import StaticLineChart from "./components/ChartComponents/StaticLineChart";

import styles from "./App.module.css";

const App = () => {
  const [data, setData] = useState([]);
  const [timerStart, setTimerStart] = useState(false);
  const [stopFetching, setStopFetching] = useState(true);
  const [disableFetchButton, setDisableFetchButton] = useState(false);
  const [showRecordedDataInstance, setRecordedDataInstance] = useState(null);

  const receiveDataHandler = useCallback((data, timerStart) => {
    setData((prevData) => {
      // return [...prevData, ...data];
      return [...data];
    });
    setTimerStart(timerStart);
    setDisableFetchButton(timerStart);
  }, []);

  const stopButtonHandler = useCallback(() => {
    setStopFetching((prevState) => {
      if (!prevState) {
        setTimerStart(false);
      }
      return !prevState;
    });
  }, []);

  const clickListDataHandler = (data) => {
    // setToggleData((v) => true);
    // setStopFetching((v) => true);

    setRecordedDataInstance((prev) => data);
  };

  const stopButtonName = stopFetching ? "START LIVE DATA" : "STOP LIVE DATA";

  return (
    <div className={styles.app}>
      <div className={styles.border}>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <div className={styles.closeLiveChart}>
              <Button
                className={styles.stopButton}
                onClick={stopButtonHandler}
                disabled={disableFetchButton}
              >
                {stopButtonName}
                {stopFetching && (
                  <PlayCircleFilledIcon className={styles.closeButton} />
                )}
                {!stopFetching && <PauseIcon />}
              </Button>
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
                dataArray={data}
                timer={timerStart}
                onShow={clickListDataHandler}
              ></ListDataComponent>
            </Card>

            <Card className={styles.barChart}>
              <StaticLineChart data={showRecordedDataInstance} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
