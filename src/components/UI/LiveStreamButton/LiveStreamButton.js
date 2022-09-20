import Button from "@mui/material/Button";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseIcon from "@mui/icons-material/Pause";

const LiveStreamButton = (props) => {
  const stopButtonName = props.stopFetching
    ? "START LIVE DATA"
    : "STOP LIVE DATA";
  return (
    <>
      <Button onClick={props.onClick} disabled={props.disabled}>
        {stopButtonName}
        {props.stopFetching && <PlayCircleFilledIcon />}
        {!props.stopFetching && <PauseIcon />}
      </Button>
    </>
  );
};

export default LiveStreamButton;
