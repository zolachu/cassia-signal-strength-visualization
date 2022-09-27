import React, { useState, useEffect } from "react";
import styles from "./ListDataComponent.module.css";
import SingleDataComponent from "../SingleDataRecord/SingleDataComponent";

const ListDataComponent = (props) => {
  const dataList = props.data;
  console.log(dataList, "aaa");
  const [data, setData] = useState([]);

  React.useEffect(() => {
    setData(dataList);
  }, [dataList]);

  const deleteItemHandler = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  console.log(data);
  const list =
    data.length === 0
      ? ""
      : data
          .slice(0)
          .reverse()
          .map((item) => {
            console.log(item.key);
            return (
              <SingleDataComponent
                isTimerRunning={props.isTimerRunning}
                data={item.data}
                dataKey={item.key}
                key={item.key}
                onDelete={deleteItemHandler}
                onShow={(item) => props.onShow(item)}
              ></SingleDataComponent>
            );
          });

  return (
    <div className={styles.container}>
      {/* <h4>Recorded Data Stats</h4> */}
      {/* {data[0].length === 0 ? (
        <h5 style={{ color: "rgb(0,0,0)" }}> No Data Records Available</h5>
      ) : ( */}
      {/* <div> */}
      <ul>{list}</ul>
    </div>
  );
};

export default ListDataComponent;
