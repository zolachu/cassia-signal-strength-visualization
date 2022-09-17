import { Chart } from "react-chartjs-2";
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

const findDistinctElements = (array) => {
  let map = new Map();
  for (let i = 0; i < array.length; i++) {
    if (!map.has(array[i])) map[array[i]] = 0;
    map[array[i]]++;
  }
  console.log(map);
  return map;
};

const datasetKeyProvider = () => {
  return (Math.random() + 1).toString(36).substring(0, 12);
};

const config = [chartColors, datasetKeyProvider, findDistinctElements];
export default config;
