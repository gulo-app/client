import React, {Component} from 'react';
import './style.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {googleLogin} from '../../actions/index.js';

import {Redirect} from 'react-router-dom';
import GoogleLogin from 'react-google-login';

class Login extends Component{
  constructor(props){
    super(props);
    this.googleLoginSuccess = this.googleLoginSuccess.bind(this);
  }
  googleLoginSuccess(cb){
    const user = cb.profileObj;
    this.props.googleLogin(user);
  }
  googleLoginFailed(err){
    console.log(err);
  }

  render(){
    const user = this.props.user;
    if(user) return <Redirect to='/' />;

    return(
      <div className="Login">
          <div className="logo-container">
            Login Page
            <div className='types'>
              <GoogleLogin
                clientId="180978526897-8o5c4k9vakqt2eqfbgd2u9ng5jaobl4j.apps.googleusercontent.com"
                render={renderProps => (
                    <button onClick={renderProps.onClick}>This is my custom Google button</button>
                )}
                buttonText="Login"
                onSuccess={this.googleLoginSuccess}
                onFailure={this.googleLoginFailed}
              />
            </div>
          </div>
      </div>
    );
  }
}
function mapStateToProps({user}){
  return {user};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({googleLogin}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
