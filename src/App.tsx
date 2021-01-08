import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../assets/icon.svg';
import Form from './Form';
import { FormInput } from './shared/models/FormInput';

const robot = require('robotjs');
const { ipcRenderer } = window.require('electron');

const Hello = () => {
  ipcRenderer.removeAllListeners('global-shortcut');
  const [state, setState]: [any, any] = useState({});
  const getForm = (form: any) => {
    setState(() => form);
  };

  function robotTest(index: number) {
    if (state[index]) {
      const x = state[index][FormInput.x];
      const y = state[index][FormInput.y];
      robot.moveMouse(x, y);
      robot.mouseClick();
    }
  }
  ipcRenderer.on('global-shortcut', (_event: any, index: number) => {
    robotTest(index);
  });
  const handleClick = () => {
    console.log('GET ME THAT MOUSE');
    ipcRenderer.send('GET_MOUSE_POSITION', 'GET_MOUSE_POSITION');
  };

  return (
    <div>
      <button onClick={() => handleClick()}>Get Mouse</button>
      <Form getForm={getForm} />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
