import React, {Component} from 'react';
import './style.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {googleLogin, facebookLogin, verifyAuth} from '../../actions/user/index.js';
import {Redirect} from 'react-router-dom';

// import GoogleLogin from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';
// import "@codetrix-studio/capacitor-google-auth";
// import { Plugins } from '@capacitor/core';

// import {API_CALL}       from '../../consts';

class Login extends Component{
  constructor(props){
    super(props);
    this.responseGoogle   =   this.responseGoogle.bind(this);
    this.responseFacebook =   this.responseFacebook.bind(this);
    this.autoLogin        =   this.autoLogin.bind(this);
    this.logOut           =   this.logOut.bind(this);
    this.googleLogin      =   this.googleLogin.bind(this);
    this.facebookLogin    =   this.facebookLogin.bind(this);
  }
  componentDidUpdate(prevProps){
    if(prevProps.firebase===null && this.props.firebase){
      this.autoLogin();
      this.logOut();
    }

  }
  componentDidMount(){
    //this.props.verifyAuth();
    // if(window.FB)  //fix Facebook reLogin bug!
    //   window.location.reload(true);
    // console.log(`Login rendered`);
    // this.autoLogin();
    // this.props.login.signOut();
  }
  logOut(){
    let {firebase} = this.props;
    firebase.auth().signOut().then((cb) => {
      console.log(`singed out!!`);
    })
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
  async googleLogin(){
    // let user = await Plugins.GoogleAuth.signIn();
    // this.props.googleLogin(user.authentication);
    let {firebase} = this.props;
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider).then((user) => {
      firebase.auth().currentUser.getIdToken(true).then((idToken) => {
        this.props.googleLogin({idToken});
      })
    }).catch((e) => console.log(e.message));
  }
  async facebookLogin(){
    // let user = await Plugins.GoogleAuth.signIn();
    let {firebase} = this.props;
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(facebookProvider).then((user) => {
      console.log(user);
      //this.props.facebookLogin(user);
    }).catch((e) => console.log(e.message));
  }
  async autoLogin(){
    // API_CALL('POST', '/user/test', {data: 'moshe'}).then((cb) => {
    //   console.log(cb);
    // })
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
            <div className='google circle' onClick={this.googleLogin}></div>
            <div className='facebook circle' onClick={this.facebookLogin}></div>
          </div>
        </main>
      </div>
    );
  }
}
function mapStateToProps({user, firebase}){
  return {user, firebase};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({facebookLogin, googleLogin, verifyAuth}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);

/*
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
*/
