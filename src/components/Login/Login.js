import React, {Component} from 'react';
import './style.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {googleLogin, facebookLogin, verifyAuth} from '../../actions/user/index.js';
import {Redirect} from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

class Login extends Component{
  constructor(props){
    super(props);
    this.responseGoogle   =   this.responseGoogle.bind(this);
    this.responseFacebook =   this.responseFacebook.bind(this);
  }
  componentDidMount(){
    //this.props.verifyAuth();
  }
  responseGoogle(response){
    console.log(response);
    const user = response.profileObj;
    user.tokenId = response.tokenId;
    this.props.googleLogin(user);
  }
  responseFacebook(response){
    console.log(response);
    this.props.facebookLogin(response);
  }

  render(){
    const user = this.props.user;
    if(user) return <Redirect to='/lists' />;

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
                onSuccess={this.responseGoogle}
              />
              <FacebookLogin
                 appId="567336290432352"
                 autoLoad={false}
                 fields="name,email,picture"
                 callback={this.responseFacebook}
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
  return bindActionCreators({facebookLogin, googleLogin, verifyAuth}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
