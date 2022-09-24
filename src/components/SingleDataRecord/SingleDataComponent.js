import DataStats from "../DataStatsComponent/DataStatsComponent";
import styles from "./SingleDataComponent.module.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";

const SingleDataComponent = (props) => {
  const data = props.data.data;
  const id = props.data.id;
  const disable = props.isTimerRunning;
  const color = !props.isTimerRunning ? "warning" : "";

  const arrayY = data.map((element) => element.y);
  const distance = data.length > 0 ? data[0].distance : undefined;

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
          disabled={disable}
        >
          DELETE
          <DeleteForeverIcon color={color} />
        </Button>
        <Button onClick={() => props.onShow(data)} disabled={disable}>
          SHOW DETAILS
        </Button>
      </div>
    </li>
  );
};

export default SingleDataComponent;
