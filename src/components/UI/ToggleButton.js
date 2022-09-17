import React, { useState } from "react";

const ToggleButton = (props) => {
  const [isToggled, setIsToggled] = useState("Start");

  function clickHandler() {
    setIsToggled((prevButtonState) => {
      return prevButtonState === "Start" ? "End" : "Start";
    });
    props.onClick();
  }

  return (
    <button onClick={clickHandler} disabled={props.disable}>
      {isToggled}
    </button>
  );
};

export default ToggleButton;
