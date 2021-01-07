import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../assets/icon.svg';
import Test from './Click';
const { ipcRenderer } = window.require('electron');
ipcRenderer.on('global-shortcut', (_event: any, response: Response) => {
console.log("🚀 ~ file: App.tsx ~ line 7 ~ ipcRenderer.on ~ response", response)
console.log("🚀 ~ file: App.tsx ~ line 7 ~ ipcRenderer.on ~ _event", _event)


  console.log('received the shortcut');
});

const Hello = () => {
  return (
    <div>
      <div className="Hello">
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
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Test />
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
