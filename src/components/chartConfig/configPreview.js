import { Chart } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import "chartjs-plugin-datalabels";

var chartColors = {
  red: "rgb(255, 99, 132)",
  pink: "rgb(255, 8, 132)",
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

  return map;
};

const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    datalabels: {
      align: "start",
      anchor: "start",
    },
    legend: {
      labels: {
        // This more specific font property overrides the global property
        font: {
          size: 14,
        },
      },
    },
  },
  title: {
    display: true,
    text: "Recorded Data",
  },
  // pointBackgroundColor: "#fff",
  // radius: 100,
  scales: {
    xAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "Timeline",
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value) {
            const d = new Date(value);
            return d.toLocaleTimeString();
          },
        },
      },
    ],
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "Signal Strength",
        },
        ticks: {
          stepSize: 1,
          suggestedMax: -70,
          suggestedMin: -100,
        },
      },
    ],
  },
};

const datasetKeyProvider = () => {
  return (Math.random() + 1).toString(36).substring(0, 12);
};

const config = [chartColors, datasetKeyProvider, options];
export default config;
