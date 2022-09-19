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
  console.log(props.dataArray);
  console.log(props.isTimerRunning);

  return (
    <ul className={styles.container}>
      {data
        .slice(0)
        .reverse()
        .map((item, index) => {
          return (
            <SingleDataComponent
              isTimerRunning={props.isTimerRunning}
              data={item}
              key={Math.random()}
              id={index}
              onDelete={deleteItemHandler}
              onShow={(data) => props.onShow(data)}
            ></SingleDataComponent>
          );
        })}
    </ul>
  );
};

export default DataPoints;
