import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../assets/icon.svg';
import Form from './Form';
const robot = require('robotjs');
const { ipcRenderer } = window.require('electron');

const Hello = () => {
  return (
    <div>
      {/* <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div> */}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Form />
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}

ipcRenderer.on('global-shortcut', (_event: any, response: number) => {
  console.log(
    '🚀 ~ file: App.tsx ~ line 7 ~ ipcRenderer.on ~ response',
    response
  );
  console.log('🚀 ~ file: App.tsx ~ line 7 ~ ipcRenderer.on ~ _event', _event);

  console.log('received the shortcut');
  robotTest(response - 1);
});

function robotTest(index: number) {
  const y = 480;
  const xArray = [125, 320, 520, 780];
  const x = xArray[index];
  // Speed up the mouse.˝
  // robot.setMouseDelay(2);

  // var twoPI = Math.PI * 2.0;
  // var screenSize = robot.getScreenSize();
  // var height = screenSize.height / 2 - 10;
  // var width = screenSize.width;

  // for (var x = 0; x < width; x++) {
  // let y = height * Math.sin((twoPI * x) / width) + height;
  robot.moveMouse(x, y);
  robot.mouseClick();

  // }
}
