import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
const robot = require('robotjs');
const { ipcRenderer } = window.require('electron');

ipcRenderer.on('global-shortcut', (_event: any, response: number) => {
  console.log(
    '🚀 ~ file: App.tsx ~ line 7 ~ ipcRenderer.on ~ response',
    response
  );
  console.log('🚀 ~ file: App.tsx ~ line 7 ~ ipcRenderer.on ~ _event', _event);

  console.log('received the shortcut');
  robotTest(response - 1);
});

const Test = () => {
  return (
    <div>
      <button type="button">Test</button>
    </div>
  );
};

export default function Click() {
  return <Test />;
}

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

// 1 = 125 x 480
// 1 = 320x 480
// 1 = 520x 480
// 1 = 780x 480
