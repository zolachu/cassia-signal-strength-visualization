import React, { useState, useEffect, useMemo } from "react";
import { useElapsedTime } from "use-elapsed-time";
import styles from "./Timer.module.css";

const ElapsedTimer = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { elapsedTime, reset } = useElapsedTime({ isPlaying });

  useEffect(() => {
    setIsPlaying(props.timer);
    if (props.timer) reset();
  }, [props.timer, reset]);

  return (
    // <div className={styles.timerContainer}>
    //       <div className={styles.timerCircle}>
    //         <ElapsedTimer timer={timerStart}></ElapsedTimer>
    //       </div>
    //     </div>
    // <div>
    <div className={styles.timerContainer}>
      <p>Timer</p>
      <div className={styles.timerCircle}>
        <div className={styles.timerCount}>{elapsedTime.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ElapsedTimer;
