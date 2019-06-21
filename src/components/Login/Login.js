import React, {Component} from 'react';
import './style.scss';
import {connect}                    from 'react-redux';
import {bindActionCreators}         from 'redux';
import {firebaseLogin, verifyAuth}  from '../../actions/user/index.js';
import {withRouter}                 from 'react-router-dom';
import oAuthHandler                 from './oAuthHandler';

class Login extends Component{
  constructor(props){
    super(props);

    this.googleLogin      =   this.googleLogin.bind(this);
    this.facebookLogin    =   this.facebookLogin.bind(this);
    this.login            =   this.login.bind(this);
  }
  componentDidUpdate(prevProps){
    if(!prevProps.user && this.props.user)
      this.login();
  }

  async googleLogin(){
    const authCB = await oAuthHandler.login.google(this.props.firebase);
    this.props.firebaseLogin(authCB);
  }
  
  async facebookLogin(){
    let {firebase} = this.props;
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(facebookProvider).then((user) => {
      firebase.auth().currentUser.getIdToken(true).then((idToken) => {
        this.props.firebaseLogin({idToken}); //email: user.additionalUserInfo.profile.email
      })
    }).catch((e) => {
      console.log(e.message);
      if(e.code==='auth/account-exists-with-different-credential')
        alert('מייל זה כבר משוייך להתחברות מגוגל. \nיש להתחבר באמצעות גוגל');
    });
  }
  async login(){
    await oAuthHandler.login.rememberUser(this.props.user);
    this.props.history.push('/lists');
  }

  render(){
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
  return bindActionCreators({firebaseLogin, verifyAuth}, dispatch);
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));
