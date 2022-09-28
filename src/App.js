import React, { useState, useCallback, useEffect } from "react";
import ListDataComponent from "./components/ListDataRecords/ListDataComponent";
import Timer from "./components/UI/Timer/Timer";
import Card from "./components/UI/Card/Card";
import PreviewChartComponent from "./components/ChartComponents/PreviewChart/PreviewChartComponent";
import LiveChartComponent from "./components/ChartComponents/LiveChart/LiveChartComponent";
import LineChartComponent from "./components/ChartComponents/PreviewChart/LineChartComponent";
import DetailedListOfSingleDataRecord from "./components/DetailedListOfSingleDataRecord/DetailedListOfSingleDataRecord";

import styles from "./App.module.css";

const App = () => {
  const [data, setData] = useState(null);
  const [IsTimerRunning, setIsTimerStart] = useState(false);
  const [stopFetching, setStopFetching] = useState(false);
  const [disableFetchButton, setDisableFetchButton] = useState(false);
  const [recordedInstance, setRecordedInstance] = useState(null);

  // TODO: uncomment displayThisInstance and commentout useEffect
  const displayThisInstanceHandler = useCallback((data) => {
    setRecordedInstance(data);
  }, []);

  // console.log("GOD PLS");
  const receiveDataHandler = useCallback((data) => {
    setData(data);
  }, []);

  const timerHandler = useCallback((setStopAll) => {
    setIsTimerStart(setStopAll);
    setDisableFetchButton(setStopAll);
  }, []);

  const showInstanceHandler = (data) => {
    setRecordedInstance(data);
  };

  return (
    <div className={styles.app}>
      <div className={styles.border}>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            {/* <div className={styles.closeLiveChart}></div> */}
            <Card className={styles.chart} icon="live" title="Sensor Data">
              {/* <LiveStreamButton
                onClick={stopButtonHandler}
                disabled={disableFetchButton}
                stopFetching={stopFetching}
              ></LiveStreamButton> */}
              <LiveChartComponent
                onReceiveData={receiveDataHandler}
                onTimerRefresh={timerHandler}
                shouldStop={stopFetching}
                displayThisInstance={displayThisInstanceHandler}
              />
              <Timer timer={IsTimerRunning} shouldStop={stopFetching}></Timer>
              {/* <span>{rssi}</span> */}
              {/* <LineChartComponent
                onReceiveData={receiveDataHandler}
                shouldStop={stopFetching}
                displayThisInstance={displayThisInstanceHandler}
              /> */}
            </Card>
            <Card
              className={styles.listDataContainer}
              icon="record"
              title="List of Recorded Data"
            >
              <div className={styles.listData}>
                <ListDataComponent
                  data={data}
                  isTimerRunning={IsTimerRunning}
                  onShow={showInstanceHandler}
                ></ListDataComponent>
              </div>
            </Card>
          </div>

          <div className={styles.rightContainer}>
            <Card className={styles.barChart} icon="preview" title="Chart View">
              <PreviewChartComponent data={recordedInstance} />
            </Card>

            <Card icon="statistics" title="Recorded Data Details">
              <div className={styles.statistics}>
                {/* <PreviewChartComponent data={showRecordedDataInstance} /> */}
                <DetailedListOfSingleDataRecord
                  data={recordedInstance}
                ></DetailedListOfSingleDataRecord>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
