import Button from "@mui/material/Button";

const DetailedListOfSingleDataRecord = (props) => {
  console.log("SINGLE DATA DETAILS");
  console.log(props.data);
  if (!props.data) {
    return;
  }
  const distance = props.data.length > 0 ? props.data[0].distance : "undefined";
  const macAddress =
    props.data.length > 0 ? props.data[0].devicemac : "undefined";

  console.log(new Date(props.data[props.data.length - 1].x).getTime());
  const elapsedTime =
    props.data.length > 0
      ? (new Date(props.data[props.data.length - 1].x).getTime() -
          new Date(props.data[0].x).getTime()) /
        1000
      : "undefined";

  const elapsedMinutes = Math.floor(elapsedTime / 60);
  const elapsedSeconds = elapsedTime - elapsedMinutes * 60;
  // const timeInMinutes = elapsedMinutes > 0 ? {<bold>{elapsedMinutes}</bold> minutes} : {};

  return (
    <div>
      <div>
        time elapsed: <b>{elapsedMinutes}</b> minutes <b>{elapsedSeconds}</b>{" "}
        seconds
      </div>
      <div>
        distance: <b>{distance}</b>
      </div>
      <div>
        mac address: <b>{macAddress}</b>
      </div>
      <ul>
        {props.data.map((item) => {
          return (
            <li key={Math.random()}>
              rssi:<b> {item.y}</b> recorded at{" "}
              <b>{new Date(item.x).toTimeString().split(" ")[0]}</b>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DetailedListOfSingleDataRecord;
