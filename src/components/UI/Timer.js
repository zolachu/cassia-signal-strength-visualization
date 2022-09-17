import React, { useState, useEffect, useMemo } from "react";

import { useElapsedTime } from "use-elapsed-time";

const ElapsedTimer = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { elapsedTime, reset } = useElapsedTime({ isPlaying });

  useEffect(() => {
    setIsPlaying(props.timer);
    if (props.timer) reset();
  }, [props.timer, reset]);

  return (
    <div>
      <p>Timer</p>
      <div style={{ fontSize: 56 }}>{elapsedTime.toFixed(2)}</div>
    </div>
  );
};

export default ElapsedTimer;
