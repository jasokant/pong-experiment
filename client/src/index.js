import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Pong from 'react-pong';

var webSocket = new WebSocket("ws://td-mbp-04.local:4000", "protocolOne");

function handleMsg(event) {
  console.log(event.data);
}

webSocket.onopen = onWebSocketOpen;

function onWebSocketOpen(event) {
  console.log('CLIENT OPENED');

  window.ondeviceorientation = onDeviceOrientationChange;

  webSocket.onmessage = handleMsg;
}

function onDeviceOrientationChange(event) {
  let gamma = Math.round(event.gamma);

  if (gamma > 5) {
    webSocket.send(1);
  } else if (gamma < -5) {
    webSocket.send(-1);
  } else {
    webSocket.send(0);
  }
}

ReactDOM.render(
  <Pong/>,
  document.getElementById('root')
);
