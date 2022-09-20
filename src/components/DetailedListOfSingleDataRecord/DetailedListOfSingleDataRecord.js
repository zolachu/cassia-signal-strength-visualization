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
      {props.data.map((el) => {
        return (
          <span>
            {/* {el.x ? el.x.toString() : ""} */}
            {el.y},
          </span>
        );
      })}
    </div>
  );
};

export default DetailedListOfSingleDataRecord;
