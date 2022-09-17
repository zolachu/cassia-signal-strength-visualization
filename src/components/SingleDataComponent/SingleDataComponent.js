const SingleDataComponent = (props) => {
  console.log(new Date(props.point.x));
  const date = new Date(props.point.x).toString();
  return (
    <li>
      <div>Time: {date}</div>
      <div>Signal Strength: {props.point.y}</div>
      <div>Distance: {props.point.distance}</div>
    </li>
  );
};

export default SingleDataComponent;
