import DataStats from "../DataStatsComponent/DataStatsComponent";
import styles from "./SingleDataComponent.module.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";

const SingleDataComponent = (props) => {
  const data = props.data.data;
  const id = props.data.id;

  const arrayY = data.map((element) => element.y);
  const distance = data.length > 0 ? data[0].distance : undefined;

  const buttonClickHandler = () => {
    props.onShow(data);
  };

  return (
    <li>
      <div className={styles.container}>
        <DataStats
          className={styles.dataStats}
          array={arrayY}
          timer={props.timer}
          distance={distance}
        ></DataStats>
        <Button
          onClick={() => props.onDelete(id)}
          color="warning"
          className={styles.deleteButton}
          disabled={props.isTimerRunning}
        >
          DELETE
          <DeleteForeverIcon color={!props.isTimerRunning ? "warning" : ""} />
        </Button>
        <Button onClick={buttonClickHandler} disabled={props.isTimerRunning}>
          SHOW DETAILS
        </Button>
      </div>
    </li>
  );
};

export default SingleDataComponent;
