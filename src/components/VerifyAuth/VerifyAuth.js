import {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setUser}  from '../../actions/user';
import {API_CALL} from '../../consts';
import Storage    from '../../plugins/Storage';

class VerifyAuth extends Component{
  constructor(props){
    super(props);
    this.verifyAuth = this.verifyAuth.bind(this);

  }
  componentDidMount(){
    this.verifyAuth();
  }
  async verifyAuth(){
    let {user} = this.props;
    if(user) return true;
    const authToken =   await Storage.getItem('authToken');
    const mail      =   await Storage.getItem('mail');
        
    if(!authToken || !mail)
      this.props.history.push(`/login`);

    API_CALL('POST', '/user/login/byAuthToken', {authToken, mail}).then((user) => {
      this.props.setUser(user);
    }).catch((e) => {
      this.props.history.push(`/login`);
    });
  }
  render(){
    return null;
  }
}

function mapStateToProps({user, firebase}){
  return {user};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({setUser}, dispatch);
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(VerifyAuth));
