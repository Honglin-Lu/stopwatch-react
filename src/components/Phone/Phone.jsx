import './Phone.css';
import { Timer } from '../Timer/Timer';
import { useState, useEffect } from 'react';
import { formatTime } from '../../utils';
import { LapRecords } from '../LapRecords/LapRecords';
export function Phone() {
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [lapTime, setLapTime] = useState(0);
  const [lapTimeArray, setLapTimeArray] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let timerInterval = null;
    if (isRunning) {
      timerInterval = setInterval(() => {
        const timeNow = Date.now();
        setTime(timeNow - startTime + elapsedTime);
        setLapTime(timeNow - startTime + elapsedTime - lapTimeArray.reduce((a, b) => a + b, 0));
      }, 1000 / 60);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isRunning, startTime, elapsedTime, lapTimeArray]);

  const startTimer = () => {
    if (counter === 0) {
      setCounter((prevCounter) => prevCounter + 1);
    }
    setIsRunning(true);
    setStartTime(Date.now());
  };

  const stopTimer = () => {
    setIsRunning(false);
    setElapsedTime(elapsedTime + Date.now() - startTime);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    setCounter(0);
    setElapsedTime(0);
    setLapTimeArray([]);
  };

  const addLap = (elapsedTime) => {
    let totalLapTime = lapTimeArray.reduce((a, b) => a + b, 0);
    setLapTime(Date.now() - startTime + elapsedTime - totalLapTime);
    setLapTimeArray((lapTimeArray) => [lapTime, ...lapTimeArray]);
  };

  const lapTimer = () => {
    addLap(elapsedTime);
    setCounter((prevCounter) => prevCounter + 1);
  };

  return (
    <div className="phone-container">
      <Timer time={formatTime(time)}></Timer>
      <div className="buttons">
        <button className={isRunning ? 'Lap' : 'Reset'} onClick={!isRunning ? resetTimer : lapTimer}>
          {isRunning ? 'Lap' : 'Reset'}
        </button>
        <p>
          <span>.</span> <span className="dot-right">.</span>
        </p>
        <button className={isRunning ? 'Stop' : 'Start'} onClick={!isRunning ? startTimer : stopTimer}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
      </div>
      <LapRecords lapTime={formatTime(lapTime)} counter={counter} lapTimeArray={lapTimeArray}></LapRecords>
    </div>
  );
}
