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
  const distance = props.distance ? (
    props.distance
  ) : (
    <span style={{ color: "red", fontWeight: "bold" }}>NONE</span>
  );
  const macAddress = props.macAddress ? (
    props.macAddress
  ) : (
    <span style={{ color: "red", fontWeight: "bold" }}>NONE</span>
  );

  return (
    <div className={`${styles.dataStats} ${props.className}`}>
      <div>
        <strong>MIN:</strong> {min}
      </div>
      <div>
        <strong>MAX:</strong> {max}
      </div>
      <div>
        <strong>AVERAGE:</strong> {average}
      </div>
      <div>
        <strong>COUNT:</strong> {count}
      </div>
      <div>
        <strong>DISTANCE:</strong> {distance}
      </div>
      <div>
        <strong>MAC ADDRESS:</strong> {macAddress}
      </div>
    </div>
  );
};

export default DataStatsComponent;
