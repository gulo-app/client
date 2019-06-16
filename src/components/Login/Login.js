import React, {Component} from 'react';
import './style.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {firebaseLogin, verifyAuth} from '../../actions/user/index.js';
import {Redirect} from 'react-router-dom';

class Login extends Component{
  constructor(props){
    super(props);
    this.googleLogin      =   this.googleLogin.bind(this);
    this.facebookLogin    =   this.facebookLogin.bind(this);
  }
  componentDidUpdate(prevProps){
    if(prevProps.firebase===null && this.props.firebase){

    }
  }
  async googleLogin(){
    let {firebase} = this.props;
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider).then((user) => {
      firebase.auth().currentUser.getIdToken(true).then((idToken) => {
        this.props.firebaseLogin({idToken}); //email: user.additionalUserInfo.profile.email
      })
    }).catch((e) => console.log(e.message));
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
  return bindActionCreators({firebaseLogin, verifyAuth}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
