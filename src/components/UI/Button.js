import React, { useRef } from "react";

const Button = (props) => {
  const ref = useRef(null);
  function checkRef() {
    console.log(ref.current.innerText);
    ref.current.innerText = ref.current.innerText === "START" ? "END" : "START";
    props.onClick();
  }
  return (
    <button onClick={checkRef} ref={ref}>
      START
    </button>
  );
};

export default Button;
