import { useState } from 'react';
import { Button } from '../Button/Button.jsx';
import './Buttons.css';

export function Buttons() {
  const [leftButtonText, setLeftButtonText] = useState('Lap');
  const [rightButtonText, setRightButtonText] = useState('Start');

  const startTimer = () => {
    setLeftButtonText('Reset');
    setRightButtonText('Stop');
  };

  return (
    <div className="buttons">
      <Button title={leftButtonText} />
      <p>
        <span>.</span> <span className="dot-right">.</span>
      </p>
      <Button title={rightButtonText} operation={startTimer} />
    </div>
  );
}
