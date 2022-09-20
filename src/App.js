import React, { useState, useCallback } from "react";
import "chartjs-plugin-streaming";
import ListDataComponent from "./components/ListDataRecords/ListDataComponent";
import Timer from "./components/UI/Timer";
import Card from "./components/UI/Card/Card";
import PreviewChartComponent from "./components/ChartComponents/PreviewChart/PreviewChartComponent";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseIcon from "@mui/icons-material/Pause";
import Button from "@mui/material/Button";
import LiveChartComponent from "./components/ChartComponents/LiveChart/LiveChartComponent";
import LineChartComponent from "./components/ChartComponents/PreviewChart/LineChartComponent";

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

    setData((prevData) => [{ x: 1, y: 1, distance: 1 }, prevData]);

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
            <Card className={styles.chart} icon="live" title="Sensor Data">
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
              <LiveChartComponent
                onReceiveData={receiveDataHandler}
                shouldStop={stopFetching}
                displayThisInstance={displayThisInstanceHandler}
              />
              <Timer timer={IsTimerRunning} shouldStop={stopFetching}></Timer>
              {/* <LineChartComponent
                onReceiveData={receiveDataHandler}
                shouldStop={stopFetching}
                displayThisInstance={displayThisInstanceHandler}
              /> */}
            </Card>
            <Card className={styles.barChart} icon="preview">
              <PreviewChartComponent data={showRecordedDataInstance} />
            </Card>
          </div>

          <div className={styles.rightContainer}>
            <Card
              className={styles.listDataContainer}
              icon="record"
              title="Recorded Data Stats"
            >
              <div className={styles.listData}>
                <ListDataComponent
                  dataArray={data}
                  isTimerRunning={IsTimerRunning}
                  onShow={clickListDataHandler}
                ></ListDataComponent>
              </div>
            </Card>

            <Card className={styles.barChart} icon="preview">
              <PreviewChartComponent data={showRecordedDataInstance} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
