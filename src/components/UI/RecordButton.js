import React, { useState } from "react";
import styles from "./RecordButton.module.css";
import StopIcon from "@mui/icons-material/Stop";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    anger: createColor("#EB1D36"),
    apple: createColor("#5DBA40"),
    steelBlue: createColor("#5C76B7"),
    violet: createColor("#BC00A3"),
  },
});

const ToggleButton = (props) => {
  const [isRecording, setIsRecording] = useState(true);
  const [buttonText, setButtonText] = useState("RECORD");
  const [buttonColor, setButtonColor] = useState("apple");
  console.log(props.disable);

  function clickHandler() {
    setButtonText((prevText) => {
      return prevText === "RECORD" ? "STOP" : "RECORD";
    });
    setButtonColor((prevColor) => {
      return prevColor === "apple" ? "anger" : "apple";
    });
    setIsRecording((prevButtonState) => {
      return !prevButtonState;
    });
    props.onClick();
  }

  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={clickHandler}
        color={buttonColor}
        variant="contained"
        disabled={props.disable}
        style={{ width: "15%" }}
      >
        <span className={styles.buttonText}>
          {buttonText}
          {!isRecording ? (
            <StopIcon size="small" />
          ) : (
            <RadioButtonCheckedIcon size="small" />
          )}
        </span>
      </Button>
    </ThemeProvider>
  );
};

export default ToggleButton;
