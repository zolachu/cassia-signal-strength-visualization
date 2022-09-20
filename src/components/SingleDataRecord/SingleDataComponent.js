import DataStats from "../DataStatsComponent/DataStatsComponent";
import Card from "../UI/Card/Card";
import styles from "./SingleDataComponent.module.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";

const SingleDataComponent = (props) => {
  //   console.log(props.data);
  //   props.isTimerRunning
  console.log("here in single data p");
  console.log(props.data);
  const arrayY = props.data.map((element) => element.y);
  const distance = props.data.length > 0 ? props.data[0].distance : undefined;

  const buttonClickHandler = () => {
    props.onShow(props.data);
  };

  return (
    <li>
      <Card className={styles.container}>
        <DataStats
          className={styles.dataStats}
          array={arrayY}
          timer={props.timer}
          distance={distance}
        ></DataStats>
        {/* <Button
          onClick={() => props.onDelete(props.id)}
          color="warning"
          className={styles.deleteButton}
          disabled={props.isTimerRunning}
        >
          delete
          <DeleteForeverIcon color={!props.isTimerRunning ? "warning" : ""} />
        </Button> */}
        <Button onClick={buttonClickHandler} disabled={props.isTimerRunning}>
          Show Details
        </Button>
      </Card>
    </li>
  );
};

export default SingleDataComponent;
