import React, { useEffect } from "react";
import "./PomodoroTimer.css";

const PomodoroTimer = ({ timerState, setTimerState }) => {
  const { timeLeft, timerType, timerRunning } = timerState;

  // Save the timer state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("pomodoroTimerState", JSON.stringify(timerState));
  }, [timerState]);

  // Load the timer state from localStorage when the component mounts
  useEffect(() => {
    const savedState = localStorage.getItem("pomodoroTimerState");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      if (parsedState.timerRunning && parsedState.startTime) {
        const now = new Date().getTime();
        const elapsedTime = Math.floor((now - parsedState.startTime) / 1000);
        parsedState.timeLeft = parsedState.timeLeft - elapsedTime;
      }
      setTimerState(parsedState);
    }
  }, [setTimerState]);
  useEffect(() => {
    const savedState = localStorage.getItem("pomodoroTimerState");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      if (parsedState.timerRunning && parsedState.startTime) {
        const now = new Date().getTime();
        const elapsedTime = Math.floor((now - parsedState.startTime) / 1000);
        parsedState.timeLeft = parsedState.timeLeft - elapsedTime;
      }
      setTimerState(parsedState);
    }
  }, [setTimerState]);
    

  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      const now = new Date().getTime();
      const newStartTime = timerState.startTime || now;
      setTimerState((prevState) => ({ ...prevState, startTime: newStartTime }));
      interval = setInterval(() => {
        setTimerState((prevState) => ({
          ...prevState,
          timeLeft: prevState.timeLeft - 1,
        }));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning, setTimerState]);
  

  useEffect(() => {
    if (timeLeft === 0 && timerType === "work" && !timerState.firstLoad) {
      alert("Time for a break!");
      setTimerState({ timeLeft: 5 * 60, timerType: "break", timerRunning: true, firstLoad: false });
    } else if (timeLeft === 0 && timerType === "break" && !timerState.firstLoad) {
      alert("Break is over, back to work!");
      setTimerState({ timeLeft: 25 * 60, timerType: "work", timerRunning: true, firstLoad: false });
    }
    // Set firstLoad to false after the first run
    if (timerState.firstLoad) {
      setTimerState((prevState) => ({ ...prevState, firstLoad: false }));
    }
  }, [timeLeft, timerType, timerState, setTimerState]);
  
  const toggleTimer = () => {
    setTimerState((prevState) => ({
      ...prevState,
      timerRunning: !prevState.timerRunning,
    }));
  };

  const resetTimer = () => {
    setTimerState({ timeLeft: 25 * 60, timerType: "work", timerRunning: false });
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
      <div className="pomodoro-timer-time">{formatTime(timeLeft)}</div>
      <li className="pomodoro-timer-button">
        <button className="button-item" onClick={toggleTimer}>
          {timerRunning ? "Pause" : "Start"}
        </button>
        <button className="button-item" onClick={resetTimer}>
          Reset
        </button>
      </li>
    </div>
  );
};

export default PomodoroTimer;
