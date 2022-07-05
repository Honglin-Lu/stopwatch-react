//import { Button } from '../Button/Button.jsx';
import { useEffect, useState } from 'react';
import './Buttons.css';

export function Buttons({ handleElapsedTime, handleLapElapsedTime, handleCounter, addLiElement }) {
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
        handleElapsedTime(Date.now() - startTime + elapsedTime);
        handleLapElapsedTime(Date.now() - startTime + elapsedTime - totalLapTime);
      }, 1000 / 60);
    }
    return () => {
      clearInterval(timerInterval);
    };
  });
  useEffect(() => {
    handleCounter(counter + 1);
  }, [counter, handleCounter]);

  const startTimer = () => {
    if (counter === 0) {
      setCounter(counter + 1);
      addLiElement();
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
    setCounter(0);
    setElapsedTime(0);
    handleElapsedTime(0);
  };

  const addLap = (elapsedTime) => {
    setLapTime(Date.now() - startTime + elapsedTime - totalLapTime);
    setLapTimeArray((lapTimeArray) => [...lapTimeArray, lapTime]);
    setTotalLapTime(totalLapTime + lapTime);
  };

  const lapTimer = () => {
    addLap(elapsedTime);
    setCounter(counter + 1);
    addLiElement();
  };

  return (
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
  );
}
