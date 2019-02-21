import React, { Component } from 'react';
import * as firebase from 'firebase'
import { withRouter } from 'react-router-dom'
import './App.css';
import { Chat } from './chat'
import { ConvoList } from './convolist'


export class Main extends React.PureComponent {
  state = {
    tempUsername: '',
    user: null
  }
  
  async sendUsername(){
    await firebase.auth().signInAnonymously()
    firebase.database().ref(`usernames/${firebase.auth().currentUser.uid}` ).update({
      username: this.state.tempUsername
    })
    this.setState({ user: firebase.auth().currentUser })
  }

  findMatch(){
    const { user } = this.state 
    this.setState({ finding: true })
    firebase.database().ref('waitingList').once('value').then((snapshot)=>{
      if(!snapshot.val()){
        firebase.database().ref('waitingList').update({
          [user.uid]: this.state.username
        })
      }
      else if ( !Object.keys(snapshot.val()).some(uid => uid === user.uid) ){
        this.matchUp(snapshot.val())
      }
    })
    
  }
  newKeyForPath(path) {
    return firebase.database().ref(path).push().key
  }

  matchUp(otherPersonUid){
    firebase.database().ref('matchups').update({
      [this.state.user.uid]: Object.keys(otherPersonUid)[0]
    })
    firebase.database().ref('waitingList').set({
      [Object.keys(otherPersonUid)[0]]: null
    })
    this.createConvo(this.state.user.uid, Object.keys(otherPersonUid)[0])
  }


  async componentDidMount(){
    await firebase.auth().signInAnonymously()
    this.state.user = firebase.auth().currentUser
    firebase.database().ref(`usernames/${this.state.user.uid}`).on('value', (snapshot) => {
      if (snapshot.val()){
        this.setState({ username: snapshot.val().username || null, convoId: snapshot.val().convo || null })
      }
      
    })
    firebase.database().ref(`usernames/${this.state.user.uid}/convo`).on('value', (snapshot) => {
      this.setState({currentConvoId: snapshot.val()})
    })
    firebase.database().ref(`usernames/${this.state.user.uid}/username`).on('value', (snapshot) => {
      this.setState({ username: snapshot.val() })
    })

    
  }

  createConvo(person1id, person2id){
    const key = this.newKeyForPath('convo')
    firebase.database().ref(`usernames/${person2id}`).update({
      convo: key
    })
    firebase.database().ref(`usernames/${person1id}`).update({
      convo: key
    })
    this.setState({ currentConvoId: key })
  }

  


  render() {
    return (
      <div style={{ textAlign: 'center', marginTop: '10%'}} >
        {
          this.state.username ? 
            <div style={{ marginBottom: '20px' }}> hey <span style={{ color: 'blue' }} >{this.state.username}</span> ! </div> 
          : <div >
              Please enter your username
              <input onChange={(event) => { this.setState({ tempUsername: event.target.value })}} />
              <button onClick={()=>this.sendUsername()}>
                send
              </button>
            </div>
        }
        {
          this.state.currentConvoId 
          ? 
            <Chat convoId={this.state.currentConvoId} /> 
          : 
            this.state.username 
            ? 
              this.state.finding 
              ? 
                <div>looking for people...</div>
              : 
                <button onClick={()=>{this.findMatch()}}>find a match</button> 
            : 
              null
        } 
      </div>
    );
  }
}