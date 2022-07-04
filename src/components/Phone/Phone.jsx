import './Phone.css';
import { Timer } from '../Timer/Timer';
import { Buttons } from '../Buttons/Buttons';
//mport { LapRecords } from '../LapRecords/LapRecords';
import { useState } from 'react';
import { displayTime } from '../../utils';
import { OneLapRecord } from '../OneLapRecord/OneLapRecord';
export function Phone() {
  const [time, setTime] = useState('00:00.00');
  const [lapTime, setLapTime] = useState('00:00.00');
  const [count, setCount] = useState(1);
  const [liElements, setLiElements] = useState([]);
  const handleElapsedTime = (milliSeconds) => {
    setTime(displayTime(milliSeconds));
  };
  const handleLapElapsedTime = (milliSeconds) => {
    setLapTime(displayTime(milliSeconds));
  };
  const handleCounter = (counter) => {
    setCount(counter);
  };
  const addLiElement = () => {
    setLiElements([<OneLapRecord time={time} lapTime={lapTime} count={count} key={count} />, ...liElements]);
  };
  return (
    <div className="phone-container">
      <Timer time={time}></Timer>
      <Buttons
        handleElapsedTime={handleElapsedTime}
        handleCounter={handleCounter}
        handleLapElapsedTime={handleLapElapsedTime}
        addLiElement={addLiElement}
      ></Buttons>
      <div className="lap-records-container">
        <ul className="lap-records">{liElements}</ul>
      </div>
    </div>
  );
}
