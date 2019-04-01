import {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setUser} from '../../actions/user/index.js';
import {API_CALL} from '../../consts';

class VerifyAuth extends Component{
  constructor(props){
    super(props);
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
      this.props.history.push(`/login`);
    });
  }
  render(){
    return null;
  }
}

function mapStateToProps({user}){
  return {user};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({setUser}, dispatch);
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(VerifyAuth));
