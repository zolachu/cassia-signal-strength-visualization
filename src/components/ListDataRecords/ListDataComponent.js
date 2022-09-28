import React, { useState, useEffect } from "react";
import styles from "./ListDataComponent.module.css";
import SingleDataComponent from "../SingleDataRecord/SingleDataComponent";

const ListDataComponent = (props) => {
  const dataList = props.data;
  console.log(dataList, "aaa");
  const [data, setData] = useState([]);

  React.useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8080/data/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      const data = await response.json();
      console.log(data, "THIS IS THE DATA");
      const dictionary = {};
      data.map((instance) => {
        if (!dictionary[instance["key"]]) dictionary[instance["key"]] = [];
        dictionary[instance["key"]].push({
          x: instance["timestamp_unix"],
          y: instance["rssi"],
          distance: instance["distance"],
          devicemac: instance["devicemac"],
        });
      });
      const list = [];
      for (const [key, value] of Object.entries(dictionary)) {
        list.push({ key: key, data: value });
      }

      console.log(list, "THIS IS THE BEAUTIFUL LIST");
      setData(list);
    })();
  }, []);

  React.useEffect(() => {
    setData((prevData) => {
      const newData = [...prevData, ...dataList];
      return newData;
    });
  }, [dataList]);

  const deleteItemHandler = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);

    (async () => {
      const response = await fetch(`http://localhost:8080/data/${key}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      const data = await response.json();
      // console.log(data, "SUCCESS deleting");
    })();
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
