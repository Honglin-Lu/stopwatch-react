import './Button.css';

export function Button(props) {
  return (
    <button className={'btn' + props.title} onClick={props.operation}>
      {props.title}
    </button>
  );
}
