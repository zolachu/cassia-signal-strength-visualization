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
  // const [toggleData, setToggleData] = useState(false);

  const receiveDataHandler = useCallback((data, timerStart) => {
    setData((prevData) => {
      // return [...prevData, ...data];
      return [...data];
    });

    setTimerStart(timerStart);
  }, []);

  const stopButtonHandler = useCallback(() => {
    setStopFetching((v) => {
      if (!v) {
        setTimerStart(false);
      }
      return !v;
    });

    // console.log("clicked");
    // setToggleData(false);
  }, []);

  const clickListDataHandler = () => {
    // setToggleData((v) => true);
    // setStopFetching((v) => true);
  };

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
              {/* )}
              {toggleData && (
                <BarChartComponent data={data}></BarChartComponent>
              )} */}
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
                onClick={clickListDataHandler}
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
