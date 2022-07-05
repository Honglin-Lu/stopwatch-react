import './LapRecords.css';
import { formatTime } from '../../utils';
//import { OneLapRecord } from '../OneLapRecord/OneLapRecord.jsx';
export function LapRecords(props) {
  const lapRecords = props.lapTimeArray;
  let maxLapIndex = lapRecords.length >= 2 ? lapRecords.indexOf(Math.max(...lapRecords)) : -1;
  let minLapIndex = lapRecords.length >= 2 ? lapRecords.indexOf(Math.min(...lapRecords)) : -1;
  const items = lapRecords.map((value, index) => {
    let maxLapStyle = maxLapIndex === index ? 'max' : '';
    let minLapStyle = minLapIndex === index ? 'min' : '';
    console.log(maxLapIndex, minLapIndex);
    return (
      <li className={'oneLapRecord ' + maxLapStyle + minLapStyle} key={lapRecords.length - index}>
        <span>Lap {lapRecords.length - index}</span>
        <span>{formatTime(value)}</span>
      </li>
    );
  });
  return (
    <div className="lap-records-container">
      <ul className="lap-records">
        {props.counter > 0 && (
          <li className="oneLapRecord">
            <span>Lap {props.counter}</span>
            <span>{props.lapTime}</span>
          </li>
        )}
        {items}
      </ul>
    </div>
  );
}
