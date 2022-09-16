import ChartComponent from "./components/chart";
import React, { useRef, useState } from "react";
import { Line, Chart } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import moment from "moment";
import Button from "./components/UI/Button";

// const Button = ({ text }) => {
//   const ref = useRef(null);
//   function checkRef() {
//     console.log(ref.current.innerText);
//     ref.current.innerText = ref.current.innerText === "START" ? "END" : "START";
//   }
//   return (
//     <button onClick={checkRef} ref={ref}>
//       START
//     </button>
//   );
// };

const App = () => {
  const toggleRef = useRef(null);

  const clickHandler = () => {
    toggleRef.current = !toggleRef.current;
    console.log(toggleRef.current);
  };

  return (
    <div>
      <ChartComponent ref={toggleRef}></ChartComponent>
      {/* <button> */}

      <Button text="aa" onClick={clickHandler} />
      {/* </button> */}
    </div>
  );
};

export default App;
