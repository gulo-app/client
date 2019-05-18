import React, {Component} from 'react';
import './style.scss';
import _ from 'lodash';
import {connect}            from 'react-redux'
import {bindActionCreators} from 'redux';
import {insertList}         from '../../../../actions/list';

import {API_CALL}   from '../../../../consts';
import RadiosAPI    from '../../../Misc/RadiosAPI';
import ListShares   from './ListShares';
import Icon         from  '../../../Misc/Icon';

class ModalList extends Component{
  constructor(props){
    super(props);
    let {list, user} = this.props;
    let creator = list ? list.creator : user;
    let isCreator = (creator.mail === user.mail) ? true: false;
    if(list) //EDIT
      this.state = {
                    creator, isCreator,
                    list_id: list.list_id, list_name: list.list_name, list_type: list.list_type_id,
                    device_id: list.device.id || '', device_password: list.device.password || '',
                    shares: list.shares, shares_deleted: [], shares_inserted: []
                  };
    else //NEW
      this.state = {creator, isCreator,
                    list_name: '', list_type: 1,
                    device_id: '', device_password: '',
                    shares: [], shares_deleted: [], shares_inserted: []
                  };

    //console.log(list);
    this.handleChange     =     this.handleChange.bind(this);
    this.submit           =     this.submit.bind(this);
    this.insertShare      =     this.insertShare.bind(this);
    this.removeShare      =     this.removeShare.bind(this);
    this.delete           =     this.delete.bind(this);
  }
  handleChange(e){
    let {name, value} = e.target;
    let stateObj = {}; stateObj[name] = value;
    this.setState(stateObj);
  }
  insertShare(share){
    let shares_inserted       =     [share, ...this.state.shares_inserted];
    let shares                =     [share, ...this.state.shares];
    let {shares_deleted}      =     this.state;
    if(_.find(shares_deleted, {user_id: share.user_id})){ //user was deleted and inserted. remove from both!
      shares_deleted  = _.filter(shares_deleted,  sd => sd.user_id!==share.user_id);
      shares_inserted = _.filter(shares_inserted, si => si.user_id!==share.user_id);
    }
    this.setState({shares, shares_inserted, shares_deleted});
  }
  removeShare(share){
    let shares_deleted         =     [share, ...this.state.shares_deleted]
    let {shares_inserted}      =     this.state;
    let shares                 =     _.filter(this.state.shares, s => s.user_id!==share.user_id)
    if(_.find(shares_inserted, {user_id: share.user_id})){ //user was insrted and deleted. remove from both!
      shares_deleted  = _.filter(shares_deleted,  sd => sd.user_id!==share.user_id);
      shares_inserted = _.filter(shares_inserted, si => si.user_id!==share.user_id);
    }
    this.setState({shares, shares_deleted, shares_inserted});
  }
  submit(e){
    e.preventDefault();
    let {list} = this.props; //check wether edit or new

    //if(!window.confirm('האם לערוך רשימה זו?')) return false;
    let api = {
      verb: !list ? 'POST'  :  'PUT',
      url:  !list ? '/list' :  `/list/${list.list_id}`
    }
    API_CALL(api.verb, api.url, this.state).then((cb) => {
      this.props.close();
    }).catch((e) => {
      let error = e.response && e.response.data;
      if(error==='device details invalid')
        alert("פרטי ההתקן אינם נכונים");
      else if(error==='device already connected')
        alert("ההתקן כבר משוייך לרשימה אחרת");
    });
  }
  delete(){
    let {isCreator, list_id}   = this.state;
    if(!window.confirm(isCreator ? `האם ברצונך למחוק סופית רשימה זו?` : `האם ברצונך להסיר השתתפותך מרשימה זו?`))
      return false;
    API_CALL('DELETE', `/list/${list_id}`, this.state).then((cb) => {
      this.props.close();
    }).catch((e) => {
      console.log(e.message);
    });
  }
  render(){
    let state = this.state;
    let {list} = this.props;
    let {creator, isCreator} = this.state;

    return(
      <div className='ModalList'>
        <header className='modal-header'>
          <div className='title'>{list ? this.props.list.list_name : 'רשימה חדשה'}</div>
          {list && <div className='left'><Icon icon="trash" color='#f95d49;' onClick={this.delete}/> </div>}
        </header>
        <form onSubmit={this.submit} onReset={() => this.props.close()}>
          <header>פרטי הרשימה</header>
          <div className='field'>
            <div>שם הרשימה</div>
            <div><input type='text' name='list_name' value={state.list_name} onChange={this.handleChange} placeholder="הכנס את שם הרשימה" required /></div>
          </div>
          <div className='field radio'>
            <RadiosAPI name='list_type' value={state.list_type} onClick={this.handleChange} api={{verb:'GET', url: '/list/types'}} readOnly={!isCreator} />
          </div>

          <header>חברי הרשימה</header>
          <div className='field'>
            <ListShares shares={state.shares} creator={creator} isCreator={isCreator}
                        onInsert={this.insertShare}  onRemove={this.removeShare}
            />
          </div>

          <header>פרטי ההתקן</header>
          {isCreator &&
            <div>
              <div className='field'>
                <div>מספר סידורי</div>
                <div><input type='number' name='device_id' value={state.device_id} onChange={this.handleChange} placeholder="הזן את מספר ההתקן שברשותך" readOnly={!isCreator}/></div>
              </div>
              <div className='field'>
                <div>סיסמא</div>
                <div><input type='text' name='device_password' value={state.device_password} onChange={this.handleChange} placeholder="הזן את הסיסמא הרשומה על גב ההתקן" readOnly={!isCreator}/></div>
              </div>
            </div>
          }


          <footer>
            <div className='cancel'><button   type="reset">ביטול</button></div>
            <div className='confirm'><button  type="submit">אישור</button></div>
          </footer>          
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => {return {user} };
function mapDispatchToProps(dispatch){
  return bindActionCreators({insertList}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ModalList);
