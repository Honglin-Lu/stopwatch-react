import './Phone.css';
import { Timer } from '../Timer/Timer';
import { useState, useEffect } from 'react';
import { formatTime } from '../../utils';
import { LapRecords } from '../LapRecords/LapRecords';
export function Phone() {
  const [time, setTime] = useState(0);
  const [leftButtonText, setLeftButtonText] = useState('Lap');
  const [rightButtonText, setRightButtonText] = useState('Start');
  const [startTime, setStartTime] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [totalLapTime, setTotalLapTime] = useState(0);
  const [lapTime, setLapTime] = useState(0);
  const [lapTimeArray, setLapTimeArray] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let timerInterval = null;
    if (isRunning) {
      timerInterval = setInterval(() => {
        setTime(Date.now() - startTime + elapsedTime);
        setLapTime(Date.now() - startTime + elapsedTime - totalLapTime);
      }, 1000 / 60);
    }
    return () => {
      clearInterval(timerInterval);
    };
  });

  const startTimer = () => {
    if (counter === 0) {
      setCounter(counter + 1);
    }
    setIsRunning(true);
    setLeftButtonText('Lap');
    setRightButtonText('Stop');
    setStartTime(Date.now());
  };

  const stopTimer = () => {
    setIsRunning(false);
    setLeftButtonText('Reset');
    setRightButtonText('Start');
    setElapsedTime(elapsedTime + Date.now() - startTime);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setLeftButtonText('Lap');
    setRightButtonText('Start');
    setTime(0);
    setCounter(0);
    setElapsedTime(0);
    setTotalLapTime(0);
    setLapTimeArray([]);
  };

  const addLap = (elapsedTime) => {
    setLapTime(Date.now() - startTime + elapsedTime - totalLapTime);
    setLapTimeArray((lapTimeArray) => [lapTime, ...lapTimeArray]);
    setTotalLapTime(totalLapTime + lapTime);
  };

  const lapTimer = () => {
    addLap(elapsedTime);
    setCounter(counter + 1);
  };

  return (
    <div className="phone-container">
      <Timer time={formatTime(time)}></Timer>
      <div className="buttons">
        <button className={'btn' + leftButtonText} onClick={leftButtonText === 'Reset' ? resetTimer : lapTimer}>
          {leftButtonText}
        </button>
        <p>
          <span>.</span> <span className="dot-right">.</span>
        </p>
        <button className={'btn' + rightButtonText} onClick={rightButtonText === 'Start' ? startTimer : stopTimer}>
          {rightButtonText}
        </button>
      </div>
      <LapRecords lapTime={formatTime(lapTime)} counter={counter} lapTimeArray={lapTimeArray}></LapRecords>
    </div>
  );
}
