import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaiseButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '', last_name:'', email:'', password:''}
  }
  render() {
    return (
      <div>
        <MultiThemeProvider>
          <div>
            <AppBar title = "Register"/>
              <TextField
                hintText = "Enter Your First Name"
                floatingLabelText = "First Name"
                onChange = {(event, newValue) => this.setState({first_name:newValue})}
              />
            <br/>

              <TextField
                hintText = "Enter Your Last Name"
                floatingLabelText = "Last Name"
                onChange = {(event, newValue) => this.setState({last_name:newValue})}
                />
            <br/>

            <TextField
              hintText = "Enter Your Email"
              type = "email"
              floatingLabelText = "Email"
              onChange = {(event, newValue) => this.setState({email:newValue})}
              />
          <br/>

          <TextField
            hintText = "Enter Your Password"
            type = "password"
            floatingLabelText = "Password"
            onChange = {(event, newValue) => this.setState({password:newValue})}
            />
        <br/>

      <RaisedButton label = "Submit" privacy = {true} style = {style} onClick = {(event) => this.handleClick(event)}
      />
    </div>
   </MultiThemeProvider>
  </div>
  );
 }
  handleClick(event) {
   var apiBaseUrl = "http://localhost:4000/api/";

  console.log("Values", this.state.first_name, this.state.last_name, this.state.email, this.state.password);
  // Check for empty values before submitting
  var self = this;
  var payload = {
    "first_name": this.state.first_name,
    "last_name": this.state.last_name,
    "email": this.state.email,
    "password": this.state.password
  }

  axios.post(apiBaseUrl + '/register', payload).then(function (response) {
    console.log(response);
    if (response.data.code == 200) {
      console.log("registration successfull");
      var loginscreen = [];
      loginscreen.push(<Login parentContext = {this}/>);
      var loginmessage = "Not Registered yet, please register";
      self.props.parentContext.setState({loginscreen:loginscreen, loginmessage:loginmessage, buttonLabel: "Register", isLogin: true});
    }
  })
  .catch(function (error) {
    console.log(error);
  });
 }
}

const style = {margin: 15,
};

export default Register;
