import React, {Component} from 'react'
import './style.scss';
import Icon from '../../../../Misc/Icon';
import {API_CALL} from '../../../../../consts';
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
      console.log(users);
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
      return <option key={user.mail} value={user.mail}>{user.mail}</option>
    })
    return options;
  }
  renderSharesList(){
    let {creator} = this.props;
    let shares = _.map(this.props.shares, (share) => {
      return (
        <div className='share' key={share.mail} onClick={() => this.validateRemove(share)}>
          <div className='pic'><img src={share.pic} alt=''/></div>
          <div className='details'>
            <div className='name'>{share.fullname}</div>
            <div className='mail'>{share.mail}</div>
          </div>
        </div>
      );
    });
    if(creator){ //add manager to list
      let Manager = (<div className='share manager' key={creator.mail}>
                      <div className='pic'><img src={creator.pic} alt=''/></div>
                      <div className='details'>
                        <div className='name'>מנהל: {creator.fullname}</div>
                        <div className='mail'>{creator.mail}</div>
                      </div>
                    </div>
                  );
       shares.unshift(Manager);
    }
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
  validateRemove(share){
    let {isCreator} = this.props;
    if(!isCreator) return false;

    if(!window.confirm(`האם להסיר מהקבוצה את המשתמש\n${share.fullname}?`));
    this.props.onRemove(share);
  }
  render(){
    let {status, value, isValid} = this.state;
    let {isCreator} = this.props;

    return(
      <div className='ListShares'>
        {isCreator &&
          <div className='toggle-row'>
            <div onClick={this.toggleStatus}>
              <Icon icon={status ? 'minus' : 'plus'} /> &nbsp;
              {status ? 'ביטול הוספת שותף' : 'הוסף שותף לרשימה'}
            </div>
            {status && <div><button className='btn-plus' onClick={this.validateInsert}><Icon icon='plus' /></button></div>}
          </div>
        }
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
