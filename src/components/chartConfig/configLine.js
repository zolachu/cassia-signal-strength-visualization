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
var color = Chart.helpers.color;

const onFresh = async (recordRef, arrayRef, shouldStop, distanceRef, chart) => {
  const response = await fetch(
    "http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=1"
  );
  try {
    const data = await response.json();
    console.log(data);
    chart.data.datasets.forEach(function (dataset) {
      const dataPoint = {
        x: Date.now(),
        y: -data[0],
        distance: distanceRef.current.value,
      };
      dataset.data.push(dataPoint);
      dataset.segment.backgroundColor = chartColors.yellow;

      //if button is toggled, push new [x,y] point to arrayRef.current
      if (recordRef.current) {
        const lastElement = arrayRef.current[arrayRef.current.length - 1];
        lastElement.push(dataPoint);
      } else {
        if (arrayRef.current[arrayRef.current.length - 1].length > 0) {
          arrayRef.current.push([]);
        }
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
