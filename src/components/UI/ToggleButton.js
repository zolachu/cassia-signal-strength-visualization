import React, { useState } from "react";

const ToggleButton = (props) => {
  const [isToggled, setIsToggled] = useState("Start");

  function clickHandler() {
    setIsToggled((v) => {
      return v === "Start" ? "End" : "Start";
    });
    props.onClick();
  }

  return <button onClick={clickHandler}>{isToggled}</button>;
};

export default ToggleButton;
