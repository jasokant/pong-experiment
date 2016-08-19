import React, { Component } from 'react';
import './App.css';
import Pong from 'react-pong';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Pong></Pong>
      </div>
    );
  }
}

export default App;
