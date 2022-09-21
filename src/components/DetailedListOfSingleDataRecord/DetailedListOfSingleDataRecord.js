import Button from "@mui/material/Button";

const DetailedListOfSingleDataRecord = (props) => {
  console.log("SINGLE DATA DETAILS");
  console.log(props.data);
  if (!props.data) {
    return;
  }
  const distance = props.data.length > 0 ? props.data[0].distance : undefined;

  return (
    <div>
      <div>time elapsed:{props.timer}</div>
      <div>distance: {distance}</div>
      <ul>
        {props.data.map((el) => {
          return (
            <li key={Math.random()}>
              {/* {el.x ? el.x.toString() : ""} */}
              {el.y},
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DetailedListOfSingleDataRecord;
