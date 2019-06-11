import React, {Component} from 'react';
import './style.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {googleLogin, facebookLogin, verifyAuth} from '../../actions/user/index.js';
import {Redirect} from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import {API_CALL}       from '../../consts';

class Login extends Component{
  constructor(props){
    super(props);
    this.responseGoogle   =   this.responseGoogle.bind(this);
    this.responseFacebook =   this.responseFacebook.bind(this);
    this.autoLogin        =   this.autoLogin.bind(this);
  }
  componentDidMount(){
    //this.props.verifyAuth();
    if(window.FB)  //fix Facebook reLogin bug!
      window.location.reload(true);
      console.log(`Login rendered`);
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
  autoLogin(){
    // console.log('auto login');
    // this.props.googleLogin({
    //   email: 'flom.tomer@gmail.com',
    //   tokenId: 'asgasjg',
    //   familyName: "Flom",
    //   givenName: "Tomer",
    //   googleId: "112032329369010294243",
    //   imageUrl: "https://lh3.googleusercontent.com/-ZFuW3cIz-zQ/AAAAAAAAAAI/AAAAAAAASdg/h8hqruIKXmQ/s96-c/photo.jpg",
    //   name: "Tomer Flom"
    // });
  }

  render(){
    const user = this.props.user;
    if(user) return <Redirect to='/lists' />;

    return(
      <div className="Login">
        <div className='top'>
          <div className='logo'>
            <div className='cover'/>
          </div>
          <div className='wave'/>
        </div>
        <main>
          <div className='welcome'>
            <div className='primary'>Welcome</div>
            <div className='secondary'>Sign in to discover the best of Gulo</div>
          </div>
          <div className='login-options'>
            <GoogleLogin
              clientId="180978526897-8o5c4k9vakqt2eqfbgd2u9ng5jaobl4j.apps.googleusercontent.com"
              render={renderProps => (
                  <div className='google circle' onClick={renderProps.onClick}></div>
              )}
              buttonText="Login"
              onSuccess={this.responseGoogle}
            />
            <FacebookLogin
               appId="567336290432352"
               autoLoad={false}
               fields="name,email,picture"
               callback={this.responseFacebook}
               cssClass="facebook circle"
               textButton=""
           />

          </div>
        </main>
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

/*
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
       render={renderProps => (
        <button onClick={renderProps.onClick}>This is my custom FB button</button>
      )}
   />
  </div>
</div>
*/
