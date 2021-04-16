import React from 'react';
import './Button.css';

const Button = (props) => (
  <button onClick={props.onClick}>{props.children}</button>
);

const NewButton = (...props) => {
  <button {...props}></button>
}

<NewButton style="btn green-btn" onClick={() => console.log("coucou")}></NewButton>

export default Button;
