const SingleDataComponent = (props) => {
  return (
    <li>
      <div>{props.point.x}</div>
      <div>{props.point.y}</div>
      <div>{props.point.distance}</div>
    </li>
  );
};

export default SingleDataComponent;
