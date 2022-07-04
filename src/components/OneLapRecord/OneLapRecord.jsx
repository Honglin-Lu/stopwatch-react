import './OneLapRecord.css';
export function OneLapRecord(props) {
  return (
    <li className="oneLapRecord">
      <span>Lap {props.count}</span>
      <span>{props.time}</span>
    </li>
  );
}
