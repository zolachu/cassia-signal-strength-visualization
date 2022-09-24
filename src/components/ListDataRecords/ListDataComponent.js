import React, { useState } from "react";
import styles from "./ListDataComponent.module.css";
import SingleDataComponent from "../SingleDataRecord/SingleDataComponent";

const ListDataComponent = (props) => {
  const dataList = props.data;
  const [data, setData] = useState(dataList);

  React.useEffect(() => {
    setData(dataList);
  }, [dataList]);

  const deleteItemHandler = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const list = data
    .slice(0)
    .reverse()
    .map((item, index) => {
      console.log(item.length);
      return (
        item.data.length !== 0 && (
          <SingleDataComponent
            isTimerRunning={props.isTimerRunning}
            data={item}
            key={item.id}
            id={item.id}
            onDelete={deleteItemHandler}
            onShow={(item) => props.onShow(item)}
          ></SingleDataComponent>
        )
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
