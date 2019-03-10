import React, { Component } from 'react';
import './App.css';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Gulo  from './components/Gulo';

class App extends Component {
  render() {
    const user = this.props.user;
    if(!user) return <Redirect to='/Login' />;
    else return <Gulo />;
  }
}

function mapStateToProps(state){
  return {user: state.user};
}

export default connect(mapStateToProps)(App);
