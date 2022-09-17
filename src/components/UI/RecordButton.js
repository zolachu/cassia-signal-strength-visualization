import React, { useState } from "react";
import styles from "./RecordButton.module.css";

const ToggleButton = (props) => {
  const [isToggled, setIsToggled] = useState(true);

  function clickHandler() {
    setIsToggled((prevButtonState) => {
      return !prevButtonState;
    });
    props.onClick();
  }
  const buttonText = !isToggled ? "STOP" : "RECORD";

  const buttonClass = `${styles.button} ${
    styles[isToggled ? "record" : "stop"]
  } `;

  return (
    <button
      onClick={clickHandler}
      disabled={props.disable}
      className={buttonClass}
    >
      {buttonText}
    </button>
  );
};

export default ToggleButton;
