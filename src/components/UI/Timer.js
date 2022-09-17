import React, { useState, useEffect, useMemo } from "react";
import { useElapsedTime } from "use-elapsed-time";
import styles from "./Timer.module.css";

const ElapsedTimer = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { elapsedTime, reset } = useElapsedTime({ isPlaying });

  useEffect(() => {
    setIsPlaying(props.timer && !props.shouldStop);
    if (props.timer || props.shouldStop) reset();
  }, [props.timer, props.shouldStop, reset]);

  return (
    <div className={styles.timerContainer}>
      <p>Timer</p>
      <div className={styles.timerCircle}>
        <div className={styles.timerText}>{elapsedTime.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ElapsedTimer;
