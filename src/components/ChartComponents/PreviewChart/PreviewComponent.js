import React from "react";
import "chartjs-plugin-streaming";
import { Line, Bar, Box } from "react-chartjs-2";
import "chartjs-plugin-streaming";

const PreviewComponent = (props) => {
  return (
    <>
      {props.radioValue === "Line" && (
        <Line
          height={200}
          datasetKeyProvider={props.datasetKeyProvider}
          data={props.data}
          options={props.options}
        />
      )}
      {props.radioValue === "Bar" && (
        <Bar
          height={200}
          datasetKeyProvider={props.datasetKeyProvider}
          data={props.data}
          options={props.options}
        />
      )}
    </>
  );
};

export default PreviewComponent;
