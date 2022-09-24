import React from "react";
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

const LiveChart = (props) => {
  return (
    <ResponsiveContainer width="99%" aspect={2}>
      <BarChart
        data={props.graphPoints}
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
          <LabelList dataKey="rssi" position="top" style={{ fill: "black" }} />
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
  );
};

export default LiveChart;
