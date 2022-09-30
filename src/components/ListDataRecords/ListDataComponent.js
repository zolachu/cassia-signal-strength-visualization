import React, { useState, useEffect } from "react";
import styles from "./ListDataComponent.module.css";
import SingleDataComponent from "../SingleDataRecord/SingleDataComponent";

// myList.sort(function(x, y){
//   return x.timestamp - y.timestamp;
// })

const ListDataComponent = (props) => {
  const addedData = props.data;
  console.log(addedData, "aaa");
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
          tag: instance["tag"],
        });
      });
      const list = [];
      for (const [key, value] of Object.entries(dictionary)) {
        value.sort(function (a, b) {
          return a.x - b.x;
        });
        list.push({ key: key, data: value });
      }

      setData(list);
    })();
  }, []);

  React.useEffect(() => {
    setData((prevData) => {
      const data = [...prevData];
      if (addedData !== null) data.push(addedData);
      return data;
    });
  }, [addedData]);

  const deleteItemHandler = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);

    (async () => {
      const response = await fetch(`http://localhost:8080/data/${key}`, {
        method: "DELETE",
      });
      console.log(response);
    })();
  };

  return (
    <div className={styles.container}>
      <div>
        {data.length === 0 ? (
          <h5 style={{ color: "rgb(200,2,2)" }}> No Data Records Available</h5>
        ) : (
          ""
        )}
      </div>
      <ul>
        {data.length === 0
          ? ""
          : data
              .slice(0)
              .reverse()
              .map((item) => {
                return (
                  item.data.length > 0 && (
                    <SingleDataComponent
                      isTimerRunning={props.isTimerRunning}
                      data={item.data}
                      dataKey={item.key}
                      key={item.key}
                      onDelete={deleteItemHandler}
                      onShow={(item) => props.onShow(item)}
                    ></SingleDataComponent>
                  )
                );
              })}
      </ul>
    </div>
  );
};

export default ListDataComponent;
