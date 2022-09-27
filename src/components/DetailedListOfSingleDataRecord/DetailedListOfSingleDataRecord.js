import Button from "@mui/material/Button";

const DetailedListOfSingleDataRecord = (props) => {
  console.log("SINGLE DATA DETAILS");
  console.log(props.data);
  if (!props.data) {
    return;
  }
  const distance = props.data.length > 0 ? props.data[0].distance : undefined;
  const macAddress =
    props.data.length > 0 ? props.data[0].devicemac : undefined;
  return (
    <div>
      <div>time elapsed:{props.timer}</div>
      <div>distance: {distance}</div>
      <div>mac address: {macAddress}</div>
      <ul>
        {props.data.map((el) => {
          return <li key={Math.random()}>{el.rssi}</li>;
        })}
      </ul>
    </div>
  );
};

export default DetailedListOfSingleDataRecord;
