import {Component}          from 'react';
import {withRouter}         from 'react-router-dom';
import {connect}            from 'react-redux';
import {bindActionCreators} from 'redux';
import {setUser}            from '../../actions/user';
import oAuthHandler         from '../Login/oAuthHandler';

class VerifyAuth extends Component{
  constructor(props){
    super(props);
    this.verifyAuth =   this.verifyAuth.bind(this);
    this.logout     =   this.logout.bind(this);
  }
  componentDidMount(){
    this.verifyAuth();

  }
  componentDidUpdate(prevProps){
    if(prevProps.user && !this.props.user)
      this.logout();
  }
  async verifyAuth(){
    if(this.props.user) return true;
    let user = await oAuthHandler.verifyAuth(this.props.user); //for the autoLogin next time
    if(!user)
      this.props.history.push('login');

    this.props.setUser(user);
  }
  async logout(){
    await oAuthHandler.logout(this.props.firebase);
    this.props.history.push(`/login`);
  }
  render(){
    return null;
  }
}

function mapStateToProps({user, firebase}){
  return {user, firebase};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({setUser}, dispatch);
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(VerifyAuth));
