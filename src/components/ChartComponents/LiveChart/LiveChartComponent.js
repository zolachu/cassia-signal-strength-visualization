import React, { useState, useEffect, useRef } from "react";
import {
  Bar,
  LabelList,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
} from "recharts";
import { ResponsiveContainer } from "recharts";
import RecordButton from "../../UI/RecordButton/RecordButton";
import TextField from "@mui/material/TextField";
import styles from "./LiveChartComponent.module.css";

// const serverBaseURL = "http://10.0.0.97/gap/nodes?event=1&filter_mac=50:31*";
// const serverBaseURL =
// "http://10.1.10.150/gap/nodes?event=1&filter_mac=C8:D0:83:E2:7A*";
const serverBaseURL = "http://10";

const LiveChartComponent = (props) => {
  const toggleRef = useRef(false);
  const inputRef = useRef(0);
  const series = useRef([{ data: [], id: Math.random() }]);
  const [graphPoints, updateGraphPoints] = useState([]);

  const clickToggleHandler = (shouldRecord) => {
    toggleRef.current = shouldRecord;
    if (!shouldRecord) {
      // This part sends the most current data to Preview Component.
      // If the length is more than zero then send to Preview
      if (series.current[series.current.length - 1].length > 0) {
        props.displayThisInstance(
          series.current[series.current.length - 1].data
        );
      }

      props.onReceiveData(series.current);
      series.current = [...series.current, { data: [], id: Math.random() }];
    }
    props.onTimerRefresh(toggleRef.current);
  };

  useEffect(() => {
    const eventSource = new EventSource(serverBaseURL);
    eventSource.addEventListener("error", (e) => {
      eventSource.close();
      console.log("error occurred");
    });
    eventSource.addEventListener("open", () => {
      console.log("SSE opened!");
    });
    eventSource.addEventListener("close", () => eventSource.close());
    eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data);

      //update line chart
      updateGraphPoints((prev) => {
        let newChartPoints = prev ? [...prev] : [];

        const x = new Date();
        const y = data.rssi;

        if (toggleRef.current) {
          newChartPoints.push({ date: x, recordedRssi: y });
        } else {
          newChartPoints.push({ date: x, rssi: y });
        }
        if (newChartPoints.length > 10) newChartPoints.shift();
        return newChartPoints;
      });
      if (toggleRef.current) {
        let newSeries = [...series.current];
        newSeries[newSeries.length - 1].data.push({
          x: new Date(),
          y: data.rssi,
          distance: inputRef.current.value,
        });
        series.current = newSeries;
      }
      console.log("new message");
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <div className={styles["chart-container"]}>
        <ResponsiveContainer width="99%" aspect={2}>
          <BarChart
            data={graphPoints}
            margin={{
              right: 5,
              left: -35,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              verticalFill={["#F3F7F9"]}
              fillOpacity={0.2}
            />
            <XAxis dataKey="date" scaleToFit="true" />
            <YAxis
              type="number"
              domain={["dataMin - 5", "dataMax + 10"]}
              tick={{ fontSize: 15, width: 250 }}
              // tickCount={1}
            />
            <Tooltip />
            <Legend />
            <Bar
              type="monotone"
              isAnimationActive={false}
              dataKey="rssi"
              stroke="#82ca9d"
              fill="#82ca9d"
            >
              <LabelList
                dataKey="rssi"
                position="top"
                style={{ fill: "black" }}
              />
            </Bar>
            <Bar
              type="monotone"
              dataKey="recordedRssi"
              isAnimationActive={false}
              fill="#D21404"
              stroke="#D21404"
            >
              <LabelList
                dataKey="recordedRssi"
                position="top"
                style={{ fill: "black" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.actions}>
        <RecordButton onClick={clickToggleHandler} disable={props.shouldStop} />
        <label htmlFor="inputDistance">Distance</label>
        <TextField
          id="inputDistance"
          label="Distance"
          variant="outlined"
          type="number"
          placeholder="distance in feet"
          inputRef={inputRef}
          disabled={props.shouldStop || toggleRef.current}
        />
      </div>
    </div>
  );
};

// export default React.memo(LineChartComponent);

export default LiveChartComponent;
