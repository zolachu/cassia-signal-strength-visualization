import React, { useRef, useState, useMemo } from "react";
import { Line, Chart } from "react-chartjs-2";
import "chartjs-plugin-streaming";
var chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};
var color = Chart.helpers.color;

const onFresh = async (ref, arrayRef, chart) => {
  try {
    console.log(ref, "hhh");
    const response = await fetch(
      "https://random-data-api.com/api/users/random_user"
    );
    if (!response.ok) {
      console.log("error! with request");
    }
    const data = await response.json();
    // console.log(data);
    chart.data.datasets.forEach(function (dataset) {
      dataset.data.push({
        x: Date.now(),
        y: data.id % 100,
      });
      dataset.segment.backgroundColor = chartColors.yellow;

      //if button is toggled, push new [x,y] point to arrayRef.current
      if (ref.current) {
        arrayRef.current.push({
          x: Date.now(),
          y: data.id % 100,
        });
        console.log(arrayRef.current.length, " ... ");
      }
    });
  } catch (error) {
    console.log("error ", error);
  }
};
const datasetKeyProvider = () => {
  return (Math.random() + 1).toString(36).substring(0, 12);
};

const config = [chartColors, datasetKeyProvider, onFresh, color];
export default config;
