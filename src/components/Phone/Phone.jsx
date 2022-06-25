import './Phone.css';
import { Timer } from '../Timer/Timer';
import { Buttons } from '../Buttons/Buttons';
import { LapRecords } from '../LapRecords/LapRecords';

export function Phone(props) {
  return (
    <div className="phone-container">
      <Timer></Timer>
      <Buttons></Buttons>
      <LapRecords></LapRecords>
    </div>
  );
}
