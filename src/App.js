import React, { useState, useCallback, useEffect } from "react";
import ListDataComponent from "./components/ListDataRecords/ListDataComponent";
import Timer from "./components/UI/Timer/Timer";
import Card from "./components/UI/Card/Card";
import PreviewChartComponent from "./components/ChartComponents/PreviewChart/PreviewChartComponent";
import LiveChartComponent from "./components/ChartComponents/LiveChart/LiveChartComponent";
import LineChartComponent from "./components/ChartComponents/PreviewChart/LineChartComponent";
import DetailedListOfSingleDataRecord from "./components/DetailedListOfSingleDataRecord/DetailedListOfSingleDataRecord";
import LiveStreamButton from "./components/UI/LiveStreamButton/LiveStreamButton";

import styles from "./App.module.css";

const App = () => {
  const [data, setData] = useState([]);
  const [IsTimerRunning, setIsTimerStart] = useState(false);
  const [stopFetching, setStopFetching] = useState(false);
  const [disableFetchButton, setDisableFetchButton] = useState(false);
  const [showRecordedDataInstance, setRecordedDataInstance] = useState(null);

  // TODO: uncomment displayThisInstance and commentout useEffect
  const displayThisInstanceHandler = useCallback((data) => {
    // setRecordedDataInstance(data);
  }, []);

  useEffect(() => {
    setRecordedDataInstance(data);
  }, [data]);

  const receiveDataHandler = useCallback((data, setStopAll) => {
    setData([...data]);

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

  return (
    <div className={styles.app}>
      <div className={styles.border}>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            {/* <div className={styles.closeLiveChart}></div> */}
            <Card className={styles.chart} icon="live" title="Sensor Data">
              <LiveStreamButton
                onClick={stopButtonHandler}
                disabled={disableFetchButton}
                stopFetching={stopFetching}
              ></LiveStreamButton>
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
