import { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { AreaChart, Area, ResponsiveContainer, ComposedChart } from "recharts";
import RecordButton from "../UI/RecordButton";
import config from "../chartConfig/configLine";
import TextField from "@mui/material/TextField";
import styles from "./LineChartComponent.module.css";

const serverBaseURL = "http://10.0.0.97/gap/nodes?event=1&filter_mac=50:31*";

const LineChartComponent = (props) => {
  const toggleRef = useRef(false);
  const inputRef = useRef(0);
  const [series, setSeries] = useState([[]]);
  const [tempSeries, setTempSeries] = useState(null);

  const clickToggleHandler = (shouldRecord) => {
    toggleRef.current = shouldRecord;
    props.onReceiveData(series, toggleRef.current);
  };

  useEffect(() => {
    const eventSource = new EventSource(serverBaseURL);

    eventSource.addEventListener("open", () => {
      console.log("SSE opened!");
    });

    eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data);

      //update line chart
      setTempSeries((prev) => {
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
        // const prevData = newSeries[0].data;
        const x = new Date();
        const y = data.rssi;
        //update area chart
        if (toggleRef.current) {
          console.log("recording");
          console.log(newSeries);
          // get the last area series.
          newSeries[newSeries.length - 1].push({
            x: x,
            y: y,
            distance: inputRef.current.value,
          });
        } else {
          if (lastData.length !== 0) {
            newSeries.push([]);
            console.log("pushed");
          }
          console.log("no empty area was added");
        }
        return newSeries;
      });

      console.log("new message");
    };

    return () => {
      eventSource.close();
    };
  }, []);

  console.log(series);

  return (
    <div>
      <div className={styles["chart-container"]}>
        <div>
          <h1>Sensor Data</h1>
          <ResponsiveContainer width="99%" aspect={3}>
            <ComposedChart width={1000} height={400} data={tempSeries}>
              {/* <Line data={series[0].data}> */}
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis type="number" domain={["auto", "auto"]} />
              <Tooltip />
              <Legend />
              <Bar
                //   type="monotone"
                isAnimationActive={false}
                dataKey="rssi"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Bar
                //   type="monotone"
                dataKey="recordedRssi"
                isAnimationActive={false}
                fill="#D21404"
                stroke="#D21404"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="actions">
        <div>
          <RecordButton
            onClick={clickToggleHandler}
            disable={props.shouldStop}
          />
          <label htmlFor="inputDistance">Distance</label>
          <TextField
            id="inputDistance"
            label="Distance"
            variant="outlined"
            type="number"
            placeholder="distance in feet"
            inputRef={inputRef}
            disabled={props.shouldStop}
          />
        </div>
      </div>
    </div>
  );
};

export default LineChartComponent;
