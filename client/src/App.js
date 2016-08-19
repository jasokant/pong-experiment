import React, { Component } from 'react';
import './App.css';
import Pong from 'react-pong';

class App extends Component {

  constructor() {
    super();

    this.playerOneWebSocket = new WebSocket("ws://td-mbp-01.local:4000");
    this.playerOneWebSocket.onopen = this.onPlayerOneConnected;
    this.playerOneWebSocket.onmessage = this.updatePlayerOnePosition;

    window.ondeviceorientation = this.handlePlayerOneDeviceOrientationChange;
  }

  onPlayerOneConnected = (event) => {
    console.log('CLIENT OPENED');
  };

  updatePlayerOnePosition = (event) => {
    console.log(event.data);
  };

  handlePlayerOneDeviceOrientationChange = (event) => {
    let gamma = Math.round(event.gamma);

    if (gamma > 10) {
      this.playerOneWebSocket.send(1);
    } else if (gamma < -10) {
      this.playerOneWebSocket.send(-1);
    } else {
      this.playerOneWebSocket.send(0);
    }
  };

  render() {
    return (
      <div className="App">
        <Pong></Pong>
      </div>
    );
  }
}

export default App;
