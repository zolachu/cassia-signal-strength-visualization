import DataStats from "../DataStatsComponent/DataStatsComponent";
import Card from "../UI/Card/Card";
import styles from "./SingleDataComponent.module.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";

const SingleDataComponent = (props) => {
  //   console.log(props.data);

  const arrayY = props.data.map((element) => element.y);
  const distance = props.data.length > 0 ? props.data[0].distance : undefined;

  return (
    <li>
      <Card className={styles.container}>
        <DataStats
          className={styles.dataStats}
          array={arrayY}
          timer={props.timer}
          distance={distance}
        ></DataStats>
        <Button
          onClick={() => props.onClick(props.id)}
          color="warning"
          className={styles.deleteButton}
        >
          delete
          <DeleteForeverIcon color="warning" />
        </Button>
      </Card>
    </li>
  );
};

export default SingleDataComponent;
