import DataStats from "../DataStatsComponent/DataStatsComponent";
import Card from "../UI/Card/Card";
import styles from "./SingleDataComponent.module.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { sizing } from "@mui/system";

const SingleDataComponent = (props) => {
  console.log(props.data);
  const clickHandler = () => {
    props.onClick();
    console.log("clicked");
  };
  const arrayY = props.data.map((element) => element.y);
  const distance = props.data.length > 0 ? props.data[0].distance : undefined;

  return (
    <li>
      <Card onClick={clickHandler} className={styles.container}>
        <DataStats
          className={styles.dataStats}
          array={arrayY}
          timer={props.timer}
          distance={distance}
        ></DataStats>
        <DeleteForeverIcon
          className={styles.deleteButton}
          color="warning"
          width="30px"
        />
      </Card>
    </li>
  );
};

export default SingleDataComponent;
