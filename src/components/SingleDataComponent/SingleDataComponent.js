import DataStats from "../DataStatsComponent/DataStatsComponent";
import Card from "../UI/Card/Card";
import styles from "./SingleDataComponent.module.css";

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
        <div>x</div>
        <DataStats
          array={arrayY}
          timer={props.timer}
          distance={distance}
        ></DataStats>
      </Card>
    </li>
  );
};

export default SingleDataComponent;
