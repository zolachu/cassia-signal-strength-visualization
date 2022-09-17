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

const onFresh = async (ref, arrayRef, shouldStop, distance, chart) => {
  if (shouldStop) return;
  //   console.log(distance.current.value, ref);
  try {
    const response = await fetch(
      "https://random-data-api.com/api/users/random_user"
    );
    if (!response.ok) {
      console.log("error! with request");
    }
    const data = await response.json();

    chart.data.datasets.forEach(function (dataset) {
      const dataPoint = {
        x: Date.now(),
        y: (data.id % 50) + 50,
        distance: distance.current.value,
      };
      dataset.data.push(dataPoint);
      dataset.segment.backgroundColor = chartColors.yellow;

      //if button is toggled, push new [x,y] point to arrayRef.current
      if (ref.current) {
        arrayRef.current.push(dataPoint);
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
