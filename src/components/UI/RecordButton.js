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
  const [isToggled, setIsToggled] = useState(true);

  function clickHandler() {
    setIsToggled((prevButtonState) => {
      return !prevButtonState;
    });
    props.onClick();
  }
  const buttonText = !isToggled ? "STOP  " : "RECORD";

  const color = !isToggled ? "anger" : "apple";

  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={clickHandler}
        disabled={props.disable}
        color={color}
        variant="contained"
        // size="small"
        style={{ width: "15%" }}
      >
        <span className={styles.buttonText}>
          {buttonText}
          {!isToggled ? (
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
