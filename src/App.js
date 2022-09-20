import React, { useState, useCallback } from "react";
import "chartjs-plugin-streaming";
import ListDataComponent from "./components/ListDataComponent/ListDataComponent";
import ElapsedTimer from "./components/UI/Timer";
import Card from "./components/UI/Card/Card";
import BarChartComponent from "./components/ChartComponents/BarChartComponent";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseIcon from "@mui/icons-material/Pause";
import Button from "@mui/material/Button";
import RechartLineChart from "./components/ChartComponents/RechartLineChart";

import styles from "./App.module.css";

const App = () => {
  const [data, setData] = useState([]);
  const [IsTimerRunning, setIsTimerStart] = useState(false);
  const [stopFetching, setStopFetching] = useState(false);
  const [disableFetchButton, setDisableFetchButton] = useState(false);
  const [showRecordedDataInstance, setRecordedDataInstance] = useState(null);

  const displayThisInstanceHandler = useCallback((data) => {
    setRecordedDataInstance(data);
  }, []);

  const receiveDataHandler = useCallback((data, setStopAll) => {
    setData([...data]);

    setData((prevData) => [
      [
        { x: 1, y: 1, distance: 1 },
        { x: 1, y: 1, distance: 1 },
      ],
    ]);
    setIsTimerStart(setStopAll);
    setDisableFetchButton(setStopAll);
  }, []);

  const stopButtonHandler = useCallback(() => {
    setStopFetching((prevState) => {
      if (!prevState) {
        setIsTimerStart(false);
      }
      return !prevState;
    });
  }, []);

  const clickListDataHandler = (data) => {
    setRecordedDataInstance(data);
  };

  const stopButtonName = stopFetching ? "START LIVE DATA" : "STOP LIVE DATA";

  return (
    <div className={styles.app}>
      <div className={styles.border}>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            {/* <div className={styles.closeLiveChart}></div> */}
            <Card className={styles.chart}>
              {/* <Button
                className={styles.stopButton}
                onClick={stopButtonHandler}
                disabled={disableFetchButton}
              >
                {stopButtonName}
                {stopFetching && (
                  <PlayCircleFilledIcon className={styles.closeButton} />
                )}
                {!stopFetching && <PauseIcon />}
              </Button> */}
              <RechartLineChart
                onReceiveData={receiveDataHandler}
                shouldStop={stopFetching}
                displayThisInstance={displayThisInstanceHandler}
              />
            </Card>

            <div className={styles.timerContainer}>
              <div className={styles.timerCircle}>
                <ElapsedTimer
                  timer={IsTimerRunning}
                  shouldStop={stopFetching}
                ></ElapsedTimer>
              </div>
            </div>
          </div>

          <div className={styles.rightContainer}>
            <Card className={styles.listData}>
              <ListDataComponent
                dataArray={data}
                isTimerRunning={IsTimerRunning}
                onShow={clickListDataHandler}
              ></ListDataComponent>
            </Card>

            <Card className={styles.barChart}>
              <BarChartComponent data={showRecordedDataInstance} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
