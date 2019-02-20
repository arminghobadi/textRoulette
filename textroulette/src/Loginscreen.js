import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaiseButton';
import Login from './Login';
import Register from './Register';

class Loginscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginscreen: [],
      loginmessage: '',
      buttonLabel: "Register",
      isLogin: true
    };   // That semi-colon should be there but I am not really sure if it should.
  }
  componentWillMount() {
    var loginscreen = [];
    loginscreen.push(<Login parentContext = {this} appContext = {this.props.parentContext}/>);
    var loginmessage = "Not Registered yet, please register";
    this.setState({
      loginscreen:loginscreen, loginmessage:loginmessage
    })
  }
  render() {
    return (
      <div className="loginscreen">
        {this.state.loginscreen}
      <div>
        {this.state.loginmessage}
       <MuiThemeProvider>
        <div>
          <RaisedButton label = {this.state.buttonLabel}
              primary = {true} style = {style} onClick = {(event) => this.handleClick(event)}
          />
        </div>
     </MuiThemeProvider>
    </div>
  );
  }
  handleClick(event) {
    //console.log("event", event);
    var loginmessage;
    if (this.state.isLogin) {
      var loginscreen = [];
      loginscreen.push(<Register parentContext = {this}/>);
      loginmessage = "Already registered, go to login";
      this.setState({
        loginscreen:loginscreen,
        loginmessage:loginmessage,
        buttonLabel:"Login",
        isLogin:false
      })
    }
  else {
    var loginscreen = [];
    loginscreen.push(<Login parentContext = {this}/>);
    loginmessage = "Not registered yet, please register";
    this.setState({
      loginscreen:loginscreen,
      loginmessage:loginmessage,
      buttonLabel:"Register",
      isLogin:true
    })
  }
  }
}

const style = {
  margin: 15,
};

export default Loginscreen;
