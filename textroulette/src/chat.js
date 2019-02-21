import React, { Component } from 'react';
import * as firebase from 'firebase'
import { withRouter } from 'react-router-dom'


export class Chat extends Component {
  state = {
    msgs: []
  }
  
  newKeyForPath(path) {
    return firebase.database().ref(path).push().key
  }

  componentDidMount(){
    firebase.database().ref(`convo/${this.props.convoId}`).on('value', (snapshot) => {
      if(snapshot.val())
        this.setState({ msgs: Object.values(snapshot.val()) })
    })
  }

  sendMsg(){
  
    const key = this.newKeyForPath(`convo/${this.props.convoId}`)
    firebase.database().ref(`convo/${this.props.convoId}`).update({
      [key]: this.state.msg
    })
    this.setState({ msg: '' })
  }


  render() {
    return (
      <div>
        {
          this.state.msgs.map(item => <div>{item}</div>)
        }
        <input 
          value={this.state.msg} 
          onChange={(event) => { this.setState({ msg: event.target.value }) }}
          onKeyPress={(event) => {
            if (event.key == 'Enter'){
              this.sendMsg()
            }
          }} 
        />
        <button onClick={() => this.sendMsg()}>
          send msg
        </button>
      </div>
    )
  }
}