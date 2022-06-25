import { useState } from 'react';
import { Button } from '../Button/Button.jsx';
import './Buttons.css';

export function Buttons() {
  return (
    <div className="buttons">
      {/* <Button>{leftButtonText}</Button> */}
      <Button />
      <p>
        <span>.</span> <span className="dot-right">.</span>
      </p>
      <Button></Button>
    </div>
  );
}
