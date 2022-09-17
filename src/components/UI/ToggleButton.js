import React, { useState } from "react";

const ToggleButton = (props) => {
  const [isToggled, setIsToggled] = useState("RECORD");

  function clickHandler() {
    setIsToggled((prevButtonState) => {
      return prevButtonState === "RECORD" ? "STOP" : "RECORD";
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
