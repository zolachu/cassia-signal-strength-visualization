import React, { useState } from "react";
import styles from "./ListDataComponent.module.css";
import SingleDataComponent from "../SingleDataComponent/SingleDataComponent";

const DataPoints = (props) => {
  console.log(props.dataArray.length, "arr length");

  const [data, setData] = useState(props.dataArray);
  console.log("INSIDE DATA POINTS", props.dataArray.length);
  React.useEffect(() => {
    setData(props.dataArray);
  }, [props.dataArray]);

  const deleteItemHandler = (id) => {
    console.log("removing");
    const newData = data.splice(id, 1);
    console.log(newData.length);
    setData(newData);
  };
  console.log(props.dataArray, " DATA ARRAY");
  console.log(props.isTimerRunning);
  console.log("array length ", data.length);

  return (
    <div className={styles.container}>
      <h4>Recorded Data Stats</h4>
      {/* {data[0].length === 0 ? (
        <h5 style={{ color: "rgb(0,0,0)" }}> No Data Records Available</h5>
      ) : ( */}
      <ul>
        {data
          .slice(0)
          .reverse()
          .map((item, index) => {
            console.log(item.length);
            return item.length > 0 ? (
              <SingleDataComponent
                isTimerRunning={props.isTimerRunning}
                data={item}
                key={Math.random()}
                id={index}
                onDelete={deleteItemHandler}
                onShow={(data) => props.onShow(data)}
              ></SingleDataComponent>
            ) : (
              <></>
            );
          })}
      </ul>
    </div>
  );
};

export default DataPoints;
