import styles from "./DataStatsComponent.module.css";

const DataStatsComponent = (props) => {
  const arrayY = props.array;
  const min = arrayY.length > 0 ? Math.max(...arrayY) : "Calculating...";
  const max = arrayY.length > 0 ? Math.min(...arrayY) : "Calculating...";
  const average =
    arrayY.length > 0
      ? (arrayY.reduce((a, b) => a + b, 0) / arrayY.length).toFixed(2)
      : "Calculating...";

  const count = arrayY.length > 0 ? arrayY.length : "Calculating...";

  return (
    <div className={styles.dataStats}>
      <div>MIN: {min}</div>
      <div>MAX: {max}</div>
      <div>AVERAGE: {average}</div>
      <div>COUNT: {count}</div>
      <div>DISTANCE: {props.distance}</div>
    </div>
  );
};

export default DataStatsComponent;
