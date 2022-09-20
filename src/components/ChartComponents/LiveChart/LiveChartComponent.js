import React, { useState, useEffect, useRef } from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
} from "recharts";
import { ResponsiveContainer } from "recharts";
import RecordButton from "../../UI/RecordButton";
import TextField from "@mui/material/TextField";
import styles from "./LiveChartComponent.module.css";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import IconComponent from "../../UI/IconContainer/IconComponent";

const serverBaseURL = "http://10.0.0.97/gap/nodes?event=1&filter_mac=50:31*";

const LiveChartComponent = (props) => {
  const toggleRef = useRef(false);
  const inputRef = useRef(0);
  const [series, setSeries] = useState([[]]);
  const [graphPoints, updateGraphPoints] = useState(null);

  const clickToggleHandler = (shouldRecord) => {
    toggleRef.current = shouldRecord;

    props.onReceiveData(series, toggleRef.current, inputRef.current.value);
  };

  const display = React.useMemo(
    () => props.displayThisInstance,
    [props.displayThisInstance]
  );

  useEffect(() => {
    // if (props.shouldStop)
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
        let newSeries = prev ? [...prev] : [];

        const x = new Date();
        const y = data.rssi;

        if (toggleRef.current) {
          newSeries.push({ date: x, recordedRssi: y });
        } else {
          newSeries.push({ date: x, rssi: y });
        }
        if (newSeries.length > 10) newSeries.shift();
        return newSeries;
      });

      setSeries((prevSeries) => {
        let newSeries = [...prevSeries];
        const lastData = prevSeries[prevSeries.length - 1];
        // update the line chart (add one more data)
        const x = new Date();
        const y = data.rssi;
        //update area chart
        if (toggleRef.current) {
          // get the last area series.
          newSeries[newSeries.length - 1].push({
            x: x,
            y: y,
            distance: inputRef.current.value,
          });
        } else {
          if (lastData.length !== 0) {
            display(newSeries[newSeries.length - 1]);
            newSeries.push([]);
          }
        }
        return newSeries;
      });

      console.log("new message");
    };

    return () => {
      eventSource.close();
    };
  }, [display]);

  // console.log(series);

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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis type="number" domain={["dataMin - 10", "dataMax + 10"]} />
            <Tooltip />
            <Legend />
            <Bar
              type="monotone"
              isAnimationActive={false}
              dataKey="rssi"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Bar
              type="monotone"
              dataKey="recordedRssi"
              isAnimationActive={false}
              fill="#D21404"
              stroke="#D21404"
            />
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
