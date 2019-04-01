import React, {Component} from 'react'
import './style.scss';
import Icon from '../../../Misc/Icon';
import {API_CALL} from '../../../../consts';
import _ from 'lodash';

class ListShares extends Component{
  constructor(props){
    super(props);
    this.state = {status: false, users: [], value: '', isValid: true}

    this.handleChange     =       this.handleChange.bind(this);
    this.toggleStatus     =       this.toggleStatus.bind(this);
    this.fetchUsers       =       this.fetchUsers.bind(this);
    this.validateInsert   =       this.validateInsert.bind(this);
  }
  componentDidMount(){
    this.fetchUsers()
  }
  componentDidUpdate(prevProps, prevState){
    if(prevProps.shares!==this.props.shares)
      this.setState({status: false, value: ''});
  }
  fetchUsers(){
    API_CALL('GET', '/user/getAllUsersButMe').then((users) => {
      this.setState({users});
    }).catch((e) => {
      this.setState({redirectToLogin: true})
    });
  }
  toggleStatus(){
    let status = !(this.state.status);
    this.setState({status});
  }
  renderDataListOptions(){
    let {users} = this.state;
    let options = _.map(users, (user) => {
      return <option key={user.mail} value={user.mail}>{user.fullname}</option>
    })
    return options;
  }
  renderSharesList(){
    let shares = _.map(this.props.shares, (share) => {
      return (
        <div className='share' key={share.mail}>
          <div className='pic'><img src={share.pic} alt=''/></div>
          <div className='details'>
            <div className='name'>{share.fullname}</div>
            <div className='mail'>{share.mail}</div>
          </div>
        </div>
      );
    });
    return <div className='shares-list'>{shares}</div>;
  }
  handleChange(e){
    let {value} = e.target;
    this.setState({value, isValid: true});
  }
  validateInsert(e){
    e.preventDefault();
    let {value, users} = this.state;
    let match = _.filter(users, (user) => user.mail === value);
    let isExists = _.find(this.props.shares, {mail: value});
    if(match.length===0 || isExists){
      this.setState({isValid: false});
      return false;
    }
    this.props.onInsert(match[0]);
  }
  render(){
    let {status, value, isValid} = this.state;

    return(
      <div className='ListShares'>
        <div className='toggle-row'>
          <div onClick={this.toggleStatus}>
            <Icon icon={status ? 'minus' : 'plus'} /> &nbsp;
            {status ? 'ביטול הוספת שותף' : 'הוסף שותף לרשימה'}
          </div>
          {status && <div><button className='btn-plus' onClick={this.validateInsert}><Icon icon='plus' /></button></div>}
        </div>
        {status && <input className={`ltr ${isValid ? '' : 'invalid'}`} type='text' list="users" value={value} onChange={this.handleChange} placeholder="Search partner by Email or FullName..." />}

        {!status && this.renderSharesList()}
        <datalist id="users">
          {this.renderDataListOptions()}
        </datalist>
      </div>
    )
  }
}

export default ListShares
