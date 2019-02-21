import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';
import HomePage from './home.js';
//import { login, setRedirectUrl, signup } from './actions/loginActions.js';
import { LoginWrapper, LoginSignupForm } from 'react-login-signup-form';
// import CustomInput from './customInput.js';

function mapStateToPropsForm(state) {
  return {
    isLoading: state.login.isLoading,
    isLoggedIn: state.login.isLoggedIn,
    redirectUrl: state.login.redirectUrl,
  }
}
const ConnectedForm = withRouter(connect(mapStateToPropsForm)(LoginSignupForm));

function mapStateToPropsLoginWrapper(state) {
  return {
    isLoggedIn: state.login.isLoggedIn,
  }
}
const ConnectedLoginWrapper = withRouter(connect(mapStateToPropsLoginWrapper)(LoginWrapper));

const loginButton = <FlatButton hoverColor="#2E86C1" label="LOGIN" />
const signupButton = <FlatButton hoverColor="#2E86C1" label="SIGNUP" />

const routes = (
  <div>
    <Route path='/login' render={() =>
      <ConnectedForm
        backgroundImageUrl="https://i.pinimg.com/originals/1e/92/d2/1e92d2809d44371f04cbc4d3d6ce22c1.jpg"
        buttonElement={loginButton}
        containerPosition="0.67"
        // inputElement={<CustomInput />}
        signupButton={signupButton}
        tryLoginAction={login}
        trySignupAction={signup}
      />
    } />
    <ConnectedLoginWrapper
      setRedirectUrlAction={setRedirectUrl}
    >
      <Route path='/' component={HomePage} />
    </ConnectedLoginWrapper>
  </div>
);

export default routes;
