import React, { Component } from 'react';
import './App.css';
import Pong from 'react-pong';
import io from 'socket.io-client/socket.io';

class App extends Component {

  constructor() {
    super();

    var socket = io.connect('http://td-mbp-04.local:4000', {'forceNew': false});
    this.timeout = 100;

    socket.on('gamma',function(data) {
      // console.log(data);
      // alert(data);
      this.emit('test1', 'test1');
    });

    // this.playerWebSocket.on('connect',function() {
    //   console.log("test1");
    //   this.emit('test1', 'test1');
    // });
    //
    // this.playerWebSocket.on('test2',function() {
    //   console.log("test3");
    //   this.emit('test3', 'test3');
    // });

    // this.playerWebSocket.on('gamma', function (data) {
    //   console.log(data);
    // });
    //

    // window.setInterval(function(){
    //   socket.emit('gamma', "1");
    // }, 10);

    // window.ondeviceorientation = function(event) {
    //   if (window.ondeviceorientation)
    //   socket.emit('gamma', event.gamma);
    // }

    // window.setInterval(function(){
    //   socket.emit('gamma', "1");
    // }, 10);

    window.addEventListener("deviceorientation", function(event) {
      if (event.gamma !== undefined) {
        socket.emit('gamma', event.gamma);
      }
    }, true);
  }

  handlePlayerOneDeviceOrientationChange = (event) => {
    // if (this.timeout > 0) {
    //   this.timeout = this.timeout - 1;
    //   return;
    // } else {
    //   this.timeout = 100;
    // }

    let gamma = Math.round(event.gamma);

    if (gamma > 10) {
      this.playerWebSocket.emit('gamma', "1");
    } else if (gamma < -10) {
      this.playerWebSocket.emit('gamma', "-1");
    } else {
      this.playerWebSocket.emit('gamma', "0");
    }
  };

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
