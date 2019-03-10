import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {logout} from '../../actions/index.js';

import {API_CALL} from '../../consts';

class Gulo extends Component{
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout(){
    this.props.logout();
  }
  auth_test(){
    API_CALL('POST', '/user/auth-test').then((data) => {
      console.log(data);
    }).catch(e => console.log(e));
  }
  render(){
    if (!this.props.user) return <Redirect to='Login' />;
    console.log(this.props.user);
    return(
      <div className='Gulo'>
        this is Gulo!

        <div>
          <br/><br/><br/>
          <button onClick={this.auth_test}>auth-test</button>
          <br/><br/><br/>
          <button onClick={this.logout}>LogOut</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {user: state.user};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({logout}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Gulo);
