import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
const robot = require('robotjs');
import { IpcMain } from 'electron';


const Test = () => {
  return (
    <div>
      <button onClick={robotTest} type="button">
        Test
      </button>
    </div>
  );
};

export default function Click() {
  return <Test />;
}

function robotTest() {
  // Speed up the mouse.
  // robot.setMouseDelay(2);

  // var twoPI = Math.PI * 2.0;
  // var screenSize = robot.getScreenSize();
  // var height = screenSize.height / 2 - 10;
  // var width = screenSize.width;

  // for (var x = 0; x < width; x++) {
  // let y = height * Math.sin((twoPI * x) / width) + height;
  robot.moveMouse(200, 530);
  robot.mouseClick();

  // }
}
