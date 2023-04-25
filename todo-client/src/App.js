import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './App.css';
import Todo from './Todo';
import PomodoroTimer from './PomodoroTimer';

function App() {
  const [timerState, setTimerState] = useState({
    timeLeft: 25 * 60,
    timerType: "work",
    timerRunning: false,
    firstLoad: true,
  });
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/pomodoro-timer" element={<PomodoroTimer timerState={timerState} setTimerState={setTimerState} />} />

        </Routes>
        <Navigation />
      </Router>
    </div>
  );
}

function Navigation() {
  const location = useLocation();
  const isTodoPage = location.pathname === '/';

  return (
    <div>
      <Link to={isTodoPage ? "/pomodoro-timer" : "/"}>
        <button className='swich-button'>{isTodoPage ? "Go to Pomodoro Timer" : "Go to Todo"}</button>
      </Link>
    </div>
  );
}

export default App;
