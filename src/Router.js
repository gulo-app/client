import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setFirebase} from './actions/firebase';
import Login  from  './components/Login';
import Gulo   from  './components/Gulo';

import {Plugins} from '@capacitor/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);
const { StatusBar, Device } = Plugins

class Router extends Component {
  componentDidMount(){
    this.hideStatusBar();
    this.props.setFirebase(firebase);
  }
  async hideStatusBar(){
    let deviceInfo = await Device.getInfo();
    if(deviceInfo.platform!=='web')
      StatusBar.hide();
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/Login" component={Login}></Route>
            <Route path="/" component={Gulo}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({setFirebase}, dispatch);
}
export default connect(null,mapDispatchToProps)(Router);
