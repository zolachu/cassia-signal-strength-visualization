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

const serverBaseURL = "http://10.0.0.97/gap/nodes?event=1&filter_mac=50:31*";

const LineChartComponent = () => {
  const [series, setSeries] = useState([
    { type: "line", data: [] },
    { type: "area", data: [] },
  ]);

  const [tempSeries, setTempSeries] = useState(null);

  const isToggledRef = useRef(false);

  useEffect(() => {
    const eventSource = new EventSource(serverBaseURL);

    eventSource.addEventListener("open", () => {
      console.log("SSE opened!");
    });
    console.log(eventSource.message);
    eventSource.onmessage = (e) => {
      console.log("update Data BEING FIRED");

      const data = JSON.parse(e.data);
      console.log(data);
      //update line chart
      setTempSeries((prev) => {
        console.log(prev);
        let newSeries = [];
        if (prev) {
          newSeries = [...prev];
        }

        const x = new Date();
        const y = data.rssi;

        if (isToggledRef.current) {
          newSeries.push({ date: x, rssi: y });
        } else {
          newSeries.push({ date: x, areaRssi: y });
        }
        if (newSeries.length > 10) newSeries.shift();
        return newSeries;
      });

      setSeries((prevSeries) => {
        let newSeries = [...prevSeries];

        // update the line chart (add one more data)
        const prevData = newSeries[0].data;
        const x = new Date();
        const y = data.rssi;

        let array = [
          ...prevData,
          { date: x, rssi: y, areaRssi: null, line: true },
        ];
        //shift the array
        // TODO: must delete this line!
        // if (array.length > 10) array.shift();
        // array.shift();
        newSeries[0] = { type: "line", data: array };

        //update area chart
        if (isToggledRef.current) {
          // get the last area series.
          const lastAreaData = prevSeries[prevSeries.length - 1].data;
          // console.log(lastAreaData);
          console.log(lastAreaData);
          let array = [...lastAreaData, { date: x, areaRssi: y, area: true }];

          newSeries[prevSeries.length - 1] = { type: "area", data: array };
        } else {
          console.log("NO!");
          console.log(prevSeries.length);
          const last = prevSeries[prevSeries.length - 1];
          if (last.data.length !== 0 && last.type === "area") {
            console.log("replaced last series point with empty area");
            newSeries.push({ type: "area", data: [] });
            // newSeries[newSeries.length - 1] = { type: "area", data: [] };
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

  const [buttonToggle, setButtonToggle] = useState(false);
  const toggleHandler = () => {
    isToggledRef.current = !isToggledRef.current;
    setButtonToggle((v) => !v);
  };

  return (
    <div
    // style={{
    //   display: "grid",
    //   placeItems: "center",
    //   position: "relative",
    //   width: "100%",
    // }}
    >
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
            stroke="#8884d8"
            fill="#82ca9d"
          />
          <Bar
            //   type="monotone"
            dataKey="areaRssi"
            isAnimationActive={false}
            fill="#413ea0"
            stroke="#82ca9d"
          />
        </ComposedChart>
      </ResponsiveContainer>
      <button onClick={toggleHandler}>{!buttonToggle ? "Start" : "End"}</button>
    </div>
  );
};

export default LineChartComponent;
