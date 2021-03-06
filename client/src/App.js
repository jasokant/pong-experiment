import React, { Component } from 'react';
import './App.css';
import Pong from 'react-pong';
import io from 'socket.io-client/socket.io';

class App extends Component {

  constructor() {
    super();

    var socket = io.connect('http://td-mbp-04.local:4000', {'forceNew': true});
    this.timeout = 100;

    this.whenLast = new Date();

    var e = new Event("keydown");
    e.keyCode=38;
    e.which=e.keyCode;

    var f = new Event("keydown");
    f.keyCode=40;
    f.which=f.keyCode;

    var g = new Event("keyup");
    g.keyCode=38;
    g.which=e.keyCode;

    var h = new Event("keyup");
    h.keyCode=40;
    h.which=h.keyCode;

    socket.on('gamma',(data) => {
        if(data < -15) {

          document.dispatchEvent(e);
          setTimeout(function(){document.dispatchEvent(g);},1)

        } else if(data > 15){

          document.dispatchEvent(f);
          setTimeout(function(){document.dispatchEvent(h);},1)
        }

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
        <Pong
          paddleSpeed={20}/>
      </div>
    );
  }
}

export default App;
