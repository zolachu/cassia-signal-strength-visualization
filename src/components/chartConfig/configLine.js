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

const onFresh = async (
  recordRef,
  arrayRef,
  shouldStop,
  distanceRef,
  evtSource,
  chart
) => {
  // const evtSource = new EventSource(
  //   "http://10.0.0.97/gap/nodes?event=1&filter_mac=50:31*"
  // );

  if (shouldStop) {
    // evtSource.close();
    return;
  }

  try {
    console.log("didnt close");
    evtSource.current.onmessage = (event) => {
      console.log(event.data);

      // evtSource.close();
      const data = JSON.parse(event.data);

      chart.data.datasets.forEach(function (dataset) {
        const dataPoint = {
          x: Date.now(),
          y: -data["rssi"],
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
    };
  } catch (error) {
    console.log("error ", error);
  }
};
const datasetKeyProvider = () => {
  return (Math.random() + 1).toString(36).substring(0, 12);
};

const config = [chartColors, datasetKeyProvider, onFresh, color];
export default config;
