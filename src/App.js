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
  const [data, setData] = useState([]);
  const [IsTimerRunning, setIsTimerStart] = useState(false);
  const [stopFetching, setStopFetching] = useState(false);
  const [disableFetchButton, setDisableFetchButton] = useState(false);
  const [recordedInstance, setRecordedInstance] = useState(null);

  // TODO: uncomment displayThisInstance and commentout useEffect
  const displayThisInstanceHandler = useCallback((data) => {
    setRecordedInstance(data);
  }, []);

  const receiveDataHandler = useCallback((data) => {
    setData([
      {
        data: [
          { x: 1, y: 1, distance: 1 },
          { x: 2, y: 3, distance: 3 },
          { x: 4, y: 4, distance: 5 },
          { x: 1, y: 4, distance: 1 },
          { x: 2, y: 5, distance: 3 },
          { x: 4, y: 10, distance: 5 },
          { x: 1, y: 115, distance: 1 },
          { x: 2, y: 33, distance: 3 },
          { x: 4, y: 40, distance: 5 },
        ],
        id: Math.random(),
      },
      { data: [{ x: 1, y: 1, distance: 5 }], id: Math.random() },
      { data: [{ x: 5, y: 4, distance: 2 }], id: Math.random() },
    ]);
    // setData([...data]);
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
              title="Recorded Data Stats"
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
            <Card className={styles.barChart} icon="preview">
              <PreviewChartComponent data={recordedInstance} />
            </Card>

            <Card icon="statistics">
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
