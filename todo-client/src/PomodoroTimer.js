import React, { useState, useEffect } from "react";
import "./PomodoroTimer.css"

const PomodoroTimer = () => {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (time === 0 && !isBreak) {
      alert("Time for a break!");
      setTime(5 * 60);
      setIsBreak(true);
    } else if (time === 0 && isBreak) {
      alert("Break is over, back to work!");
      setTime(25 * 60);
      setIsBreak(false);
    }
  }, [time, isBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(25 * 60);
    setIsBreak(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="pomodoro-timer">
      <h2>Pomodoro Timer</h2>
      <div className="pomodoro-timer-time">{formatTime(time)}</div>
      <li className="pomodoro-timer-button">
        <button  className="button-item" onClick={toggleTimer}>{isActive ? "Pause" : "Start"}</button>
        <button  className="button-item" onClick={resetTimer}>Reset</button>
      </li>
      
    </div>
  );
};

export default PomodoroTimer;
