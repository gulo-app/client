import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setUser} from '../../actions/user/index.js';
import {Redirect} from 'react-router-dom';
import {API_CALL} from '../../consts';

class VerifyAuth extends Component{
  constructor(props){
    super(props);
    this.state = {redirectToLogin: false};
    this.verifyAuth = this.verifyAuth.bind(this);
  }
  componentDidMount(){
    this.verifyAuth();
  }
  verifyAuth(){
    if(this.props.user) return true;
    API_CALL('POST', '/user/login/auth-test').then((user) => {
      this.props.setUser(user);
    }).catch((e) => {
      this.setState({redirectToLogin: true})
    });
  }
  render(){
    let {redirectToLogin} = this.state;
    return redirectToLogin ? <Redirect to="Login" /> : null;
  }
}

function mapStateToProps({user}){
  return {user};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({setUser}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(VerifyAuth);
