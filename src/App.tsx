import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from './Form';
import { FormInput } from './shared/models/FormInput.model';
import { IpcMessages } from './shared/models/IpcMessages.model';

const robot = require('robotjs');

const { ipcRenderer } = window.require('electron');

const Hello = () => {
  const dispatch = useDispatch();
  const mapping = useSelector((state) => state.mapping.entities);
  console.log('🚀 ~ file: App.tsx ~ line 15 ~ Hello ~ mapping', mapping);

  ipcRenderer.removeAllListeners(IpcMessages.GLOBAL_SHORTCUT);
  const [state, setState]: [any, any] = useState({});
  const getForm = (form: any) => {
    setState(() => form);
  };

  function robotTest(index: number) {
    if (mapping[index]) {
      const x = mapping[index][FormInput.x];
      console.log('🚀 ~ file: App.tsx ~ line 25 ~ robotTest ~ x', x);
      const y = mapping[index][FormInput.y];
      console.log('🚀 ~ file: App.tsx ~ line 27 ~ robotTest ~ y', y);
      if (x && y) {
        robot.moveMouse(x, y);
        robot.mouseClick();
      }
    }
  }
  ipcRenderer.on(IpcMessages.GLOBAL_SHORTCUT, (_event: any, index: number) => {
    console.log('🚀 ~ file: App.tsx ~ line 32 ~ ipcRenderer.on ~ index', index);
    robotTest(index);
  });

  return (
    <div>
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
