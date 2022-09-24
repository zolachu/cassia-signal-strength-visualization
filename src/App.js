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
  const [showRecordedDataInstance, setRecordedDataInstance] = useState(null);

  // TODO: uncomment displayThisInstance and commentout useEffect
  const displayThisInstanceHandler = useCallback((data) => {
    setRecordedDataInstance(data);
  }, []);

  useEffect(() => {
    // setRecordedDataInstance(data);
  }, [data]);

  const receiveDataHandler = useCallback((data) => {
    setData([
      {
        data: [
          { x: 1, y: 1, distance: 1 },
          { x: 1, y: 1, distance: 1 },
          { x: 1, y: 1, distance: 1 },
        ],
        id: 1,
      },
      { data: [{ x: 1, y: 1, distance: 1 }], id: 2 },
      { data: [{ x: 1, y: 1, distance: 1 }], id: 3 },
    ]);
    // setData([...data]);
  }, []);

  const timerHandler = useCallback((setStopAll) => {
    setIsTimerStart(setStopAll);
    setDisableFetchButton(setStopAll);
  }, []);

  const clickListDataHandler = (data) => {
    setRecordedDataInstance(data);
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
                  onShow={clickListDataHandler}
                ></ListDataComponent>
              </div>
            </Card>
          </div>

          <div className={styles.rightContainer}>
            <Card className={styles.barChart} icon="preview">
              <PreviewChartComponent data={showRecordedDataInstance} />
            </Card>

            <Card icon="statistics">
              <div className={styles.statistics}>
                {/* <PreviewChartComponent data={showRecordedDataInstance} /> */}
                <DetailedListOfSingleDataRecord
                  data={showRecordedDataInstance}
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
