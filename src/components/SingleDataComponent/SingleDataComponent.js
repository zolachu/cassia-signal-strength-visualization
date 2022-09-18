const SingleDataComponent = (props) => {
  const date = new Date(props.point.x).toString();

  const clickHandler = () => {
    props.onClick();
    console.log("clicked");
  };
  return (
    <li onClick={clickHandler}>
      <div>Time: {date}</div>
      <div>Signal Strength: {props.point.y}</div>
      <div>Distance: {props.point.distance}</div>
    </li>
  );
};

export default SingleDataComponent;
