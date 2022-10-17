import './Phone.css';
import { Timer } from '../Timer/Timer';
import { useEffect, useReducer } from 'react';
import { formatTime } from '../../utils';
import { LapRecords } from '../LapRecords/LapRecords';

const initialState = {
  time: 0,
  startTime: null,
  isRunning: false,
  elapsedTime: 0,
  lapTime: 0,
  lapTimeArray: [],
  counter: 0,
};

function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case 'startTimer':
      if (state.counter === 0) {
        state.counter = state.counter + 1;
      }
      return {
        ...state,
        isRunning: true,
        startTime: Date.now(),
      };

    case 'stopTimer':
      return {
        ...state,
        isRunning: false,
        elapsedTime: state.elapsedTime + Date.now() - state.startTime,
      };
    case 'resetTimer':
      return initialState;
    case 'lapTimer':
      let totalLapTime = state.lapTimeArray.reduce((a, b) => a + b, 0);
      return {
        ...state,
        lapTime: Date.now() - state.startTime + state.elapsedTime - totalLapTime,
        lapTimeArray: [state.lapTime, ...state.lapTimeArray],
        counter: state.counter + 1,
      };
    case 'updateTime':
      return {
        ...state,
        time: action.timeNow - state.startTime + state.elapsedTime,
        lapTime:
          action.timeNow -
          state.startTime +
          state.elapsedTime -
          state.lapTime -
          state.lapTimeArray.reduce((a, b) => a + b, 0),
      };
    default:
      throw new Error();
  }
}
export function Phone() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [time, setTime] = useState(0);
  // const [startTime, setStartTime] = useState();
  // const [isRunning, setIsRunning] = useState(false);
  // const [elapsedTime, setElapsedTime] = useState(0);
  // const [lapTime, setLapTime] = useState(0);
  // const [lapTimeArray, setLapTimeArray] = useState([]);
  // const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (state.isRunning) {
      const timerInterval = setInterval(() => {
        dispatch({
          type: 'updateTime',
          timeNow: Date.now(),
        });
      }, 100);
      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [state.isRunning]);

  // const startTimer = () => {
  //   if (counter === 0) {
  //     setCounter((prevCounter) => prevCounter + 1);
  //   }
  //   setIsRunning(true);
  //   setStartTime(Date.now());
  // };

  // const stopTimer = () => {
  //   setIsRunning(false);
  //   setElapsedTime(elapsedTime + Date.now() - startTime);
  // };

  // const resetTimer = () => {
  //   setIsRunning(false);
  //   setTime(0);
  //   setCounter(0);
  //   setElapsedTime(0);
  //   setLapTimeArray([]);
  // };

  // const addLap = (elapsedTime) => {
  //   let totalLapTime = lapTimeArray.reduce((a, b) => a + b, 0);
  //   setLapTime(Date.now() - startTime + elapsedTime - totalLapTime);
  //   setLapTimeArray((lapTimeArray) => [lapTime, ...lapTimeArray]);
  // };

  // const lapTimer = () => {
  //   addLap(elapsedTime);
  //   setCounter((prevCounter) => prevCounter + 1);
  // };

  return (
    <div className="phone-container">
      <Timer time={formatTime(state.time)}></Timer>
      <div className="buttons">
        <button
          className={!state.isRunning && state.time !== 0 ? 'Reset' : 'Lap'}
          onClick={!state.isRunning ? () => dispatch({ type: 'resetTimer' }) : () => dispatch({ type: 'lapTimer' })}
        >
          {!state.isRunning && state.time !== 0 ? 'Reset' : 'Lap'}
        </button>
        <p>
          <span>.</span> <span className="dot-right">.</span>
        </p>
        <button
          className={state.isRunning ? 'Stop' : 'Start'}
          onClick={!state.isRunning ? () => dispatch({ type: 'startTimer' }) : () => dispatch({ type: 'stopTimer' })}
        >
          {state.isRunning ? 'Stop' : 'Start'}
        </button>
      </div>
      <LapRecords
        lapTime={formatTime(state.lapTime)}
        counter={state.counter}
        lapTimeArray={state.lapTimeArray}
      ></LapRecords>
    </div>
  );
}
