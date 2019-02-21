import React, { Component, Route } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase'

import { Main } from './main'
import { Chat } from './chat'


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
  state = {
  }

  
  render() {
    return (
      <div className="App">
        <Main/>
      </div>
    );
  }
}

export default App;
