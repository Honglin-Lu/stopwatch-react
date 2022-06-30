//import { Button } from '../Button/Button.jsx';
import { useEffect, useState } from 'react';
import './Buttons.css';

export function Buttons({ handleElapsedTime }) {
  const [leftButtonText, setLeftButtonText] = useState('Lap');
  const [rightButtonText, setRightButtonText] = useState('Start');
  const [startTime, setStartTime] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let timerInterval = null;
    if (isRunning) {
      timerInterval = setTimeout(() => {
        // eslint-disable-next-line no-lone-blocks
        {
          handleElapsedTime(Date.now() - startTime + elapsedTime);
        }
      }, 1000 / 60);
    }
    return () => clearTimeout(timerInterval);
  });
  const startTimer = () => {
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
    setElapsedTime(0);
    // eslint-disable-next-line no-lone-blocks
    {
      handleElapsedTime(0);
    }
  };

  const lapTimer = () => {};

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
