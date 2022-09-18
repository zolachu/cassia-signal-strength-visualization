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
    apple: createColor("#7fff00"),
    steelBlue: createColor("#5C76B7"),
    violet: createColor("#BC00A3"),
  },
});

const ToggleButton = (props) => {
  const [isRecording, setIsRecording] = useState(false);
  console.log(props.disable);

  React.useEffect(() => {
    if (props.disable) {
      setIsRecording(false);
    }
    // setIsRecording(props.disable);
  }, [props.disable]);

  function clickHandler() {
    setIsRecording((prevButtonState) => {
      props.onClick(!prevButtonState);
      return !prevButtonState;
    });
    // props.onClick();
  }

  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={clickHandler}
        color={isRecording ? "anger" : "apple"}
        variant="contained"
        disabled={props.disable}
        style={{ width: "15%" }}
      >
        <span className={styles.buttonText}>
          {isRecording ? "STOP" : "RECORD"}
          {isRecording ? (
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
