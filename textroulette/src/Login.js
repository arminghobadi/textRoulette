import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaiseButton';
import TextField from 'material-ui/TextField';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'', password:''
    }
  }
  render() {
    return(
      <div>
        <MultiThemeProvider>
          <div>
            <AppBar title = "Login"/>
            <TextField hintText = "Enter A Username"
              floatingLabelText = "Username"
              onChange = {(event, newValue) => this.setState({username:newValue})}
            />
          <br/>

            <Textfield
              type = "password"
              hintText = "Enter A Password"
              floatingLabelText = "Password"
              onChange = {(event, newValue) => this.setState({password:newValue})}
            />
          <br/>

            <RaisedButton
              label = "Submit"
              primary = {true}
              style = {style} onClick = {(event) => this.handleClick(event)}
            />
        </div>
    );
  }
  handleClick(event) {
    var apiBaseUrl = "https://localhost:4000/api/";
    var self = this;
    var payload = {
      "email":this.state.username, "password":this.state.password
    }
    axios.post(apiBaseUrl + 'login', payload).then(function (response) {
      console.log(response);

      if (response.data.code == 200){
        console.log("Login successfull");
        var uploadScreen = [];
        uploadScreen.push(<UploadScreen appContext = {self.props.appContext}/>)
        self.props.appContext.setState({loginPage:[], uploadScreen:uploadScreen})
      }
      else if (response.data.code == 204) {
        console.log("Username or Password do not match");
        alert("Username or Password do not match")
      }
      else {
        console.log("The username does not exist");
        alert("The username does not exist");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

const style = {
  margin: 15,
};

export default Login;
