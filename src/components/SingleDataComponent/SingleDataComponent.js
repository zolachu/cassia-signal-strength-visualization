import DataStats from "../DataStatsComponent/DataStatsComponent";
import Card from "../UI/Card/Card";
import styles from "./SingleDataComponent.module.css";

const SingleDataComponent = (props) => {
  //   const date = new Date(props.point.x).toString();
  console.log(props.data);
  const clickHandler = () => {
    props.onClick();
    console.log("clicked");
  };
  const arrayY = props.data.map((element) => element.y);
  const distance = props.data.length > 0 ? props.data[0].distance : undefined;

  return (
    <Card onClick={clickHandler} className={styles.container}>
      <DataStats
        array={arrayY}
        timer={props.timer}
        distance={distance}
      ></DataStats>
    </Card>
  );
};

export default SingleDataComponent;
