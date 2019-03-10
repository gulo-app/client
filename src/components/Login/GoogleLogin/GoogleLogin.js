import React, {Component} from 'react';
import './style.scss';
import axios from 'axios';
import { GoogleLogin as GoogleAuth } from 'react-google-login-component';
const socialID = `180978526897-8o5c4k9vakqt2eqfbgd2u9ng5jaobl4j.apps.googleusercontent.com`;


class GoogleLogin extends Component{
  constructor(props){
    super(props);

    this.responseGoogle = this.responseGoogle.bind(this);
  }
  responseGoogle (googleUser) {
    const googleID = googleUser.getId();
    const googleToken = googleUser.getAuthResponse().id_token;
    const profile = googleUser.getBasicProfile();
    const email = profile.U3;
    const fullName = profile.ig;
    const pic = profile.Paa;
    var user = {
      googleID,
      googleToken,
      email,
      fullName,
      pic
    }

    this.props.onClick(user);
  }
  render(){
    return(
      <div className="GoogleLogin">
          <div className='login-container'>
              <GoogleAuth socialId={socialID}
                         className="google-login"
                         scope="profile"
                         fetchBasicProfile={true}
                         responseHandler={this.responseGoogle}
                         buttonText="Login With Google"
              />
          </div>
      </div>
    );
  }
}

export default GoogleLogin;
