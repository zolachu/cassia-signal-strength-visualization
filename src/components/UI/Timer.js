import React, { useState, useEffect } from "react";

import { useElapsedTime } from "use-elapsed-time";

const ElapsedTimer = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { elapsedTime } = useElapsedTime({ isPlaying });

  useEffect(() => {
    if (props.timer) {
      setIsPlaying((prevIsPlaying) => !prevIsPlaying);
      console.log("hi");
    }
  }, [props.timer]);

  return (
    <div>
      <p>Timer</p>
      <div style={{ fontSize: 56 }}>{elapsedTime.toFixed(2)}</div>
    </div>
  );
};

export default ElapsedTimer;
