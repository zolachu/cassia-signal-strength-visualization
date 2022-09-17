const DataStatsComponent = (props) => {
  const arrayY = props.array;
  const min = arrayY.length > 0 ? Math.max(...arrayY) : 0;
  const max = arrayY.length > 0 ? Math.min(...arrayY) : 0;
  const average =
    arrayY.length > 0 ? arrayY.reduce((a, b) => a + b, 0) / arrayY.length : 0;
  average.toFixed(4);
  const count = arrayY.length > 0 ? arrayY.length : 0;
  return (
    <>
      <div>MIN: {min}</div>
      <div>MAX: {max}</div>
      <div>AVERAGE: {average.toFixed(2)}</div>
      <div>COUNT: {count}</div>
    </>
  );
};

export default DataStatsComponent;
