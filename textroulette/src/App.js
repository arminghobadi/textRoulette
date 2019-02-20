import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyDgPJDFxLyhdv7eQe5GGTd_wSwhRl2WUfo",
  authDomain: "textroulette-7c2ac.firebaseapp.com",
  databaseURL: "https://textroulette-7c2ac.firebaseio.com",
  projectId: "textroulette-7c2ac",
  storageBucket: "",
  messagingSenderId: "440891409035"
};
firebase.initializeApp(config);

class App extends Component {

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
