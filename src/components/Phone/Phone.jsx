import './Phone.css';
import { Timer } from '../Timer/Timer';
import { Buttons } from '../Buttons/Buttons';
import { LapRecords } from '../LapRecords/LapRecords';
import { useState } from 'react';
import { displayTime } from '../../utils';
export function Phone() {
  const [time, setTime] = useState('00:00.00');
  const handleElapsedTime = (milliSeconds) => {
    setTime(displayTime(milliSeconds));
  };
  return (
    <div className="phone-container">
      <Timer time={time}></Timer>
      <Buttons handleElapsedTime={handleElapsedTime}></Buttons>
      <LapRecords></LapRecords>
    </div>
  );
}
