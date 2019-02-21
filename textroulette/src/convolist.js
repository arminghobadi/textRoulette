import React, { Component } from 'react';
import * as firebase from 'firebase'
import { withRouter } from 'react-router-dom'
import { Chat } from './chat'


/**
 * THIS COMPONENT WAS CREATED ONLY FOR TESTING PURPOSES.
 */

export class ConvoList extends Component {
  state = {
    username: '',
    user: null,
    convos: []
  }
  
  newKeyForPath(path) {
    return firebase.database().ref(path).push().key
  }


  async componentDidMount(){
    firebase.database().ref(`convo`).on('value', (snapshot)=>{
      if(snapshot.val()){
        this.setState({ convos: Object.keys(snapshot.val()) })
      }
    })
  }
  render() {
    return (
      <div>
        {
          this.state.convos.map(conv => <Chat convoId={conv} />)
        }
      </div>
    );
  }
}