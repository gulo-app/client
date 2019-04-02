import React, {Component} from 'react';
import './style.scss';
import {connect}            from 'react-redux'
import {bindActionCreators} from 'redux';
import {insertList}         from '../../../actions/list';

import {API_CALL} from '../../../consts';
import RadiosAPI    from '../../Misc/RadiosAPI';
import ListShares   from './ListShares';

class AddList extends Component{
  constructor(props){
    super(props);
    this.state = {list_name: '', list_type: 1, device_id: '', device_password: '', shares: []};

    this.handleChange     =     this.handleChange.bind(this);
    this.submit           =     this.submit.bind(this);
    this.insertShare      =     this.insertShare.bind(this);
  }
  handleChange(e){
    let {name, value} = e.target;
    let stateObj = {}; stateObj[name] = value;
    this.setState(stateObj);
  }
  insertShare(user){
    let shares = [...this.state.shares, user];
    this.setState({shares});
  }
  submit(e){
    e.preventDefault();
    if(!this.state.device_id)
      if(!window.confirm('האם להוסיף רשימה ללא התקן?')) return false;

    API_CALL('POST', '/list', this.state).then((list) => {
      this.props.insertList(list);
      this.props.close();
    }).catch((e) => {
      let error = e.response && e.response.data;
      if(error==='device details invalid')
        alert("פרטי ההתקן אינם נכונים");
      else if(error==='device already connected')
        alert("ההתקן כבר משוייך לרשימה אחרת");
    });
  }
  render(){
    let state = this.state;
    return(
      <div className='AddList'>
        <header className='modal-header'>צור רשימה חדשה</header>
        <form onSubmit={this.submit} onReset={() => this.props.close()}>
          <header>פרטי הרשימה</header>
          <div className='field'>
            <div>שם הרשימה</div>
            <div><input type='text' name='list_name' value={state.list_name} onChange={this.handleChange} placeholder="הכנס את שם הרשימה" required/></div>
          </div>
          <div className='field radio'>
            <RadiosAPI name='list_type' value={state.list_type} onClick={this.handleChange} api={{verb:'GET', url: '/list/types'}} />
          </div>

          <header>חברי הרשימה</header>
          <div className='field'>
            <ListShares shares={state.shares} onInsert={this.insertShare} />
          </div>

          <header>פרטי ההתקן</header>
          <div className='field'>
            <div>מספר סידורי</div>
            <div><input type='number' name='device_id' value={state.device_id} onChange={this.handleChange} placeholder="הזן את מספר ההתקן שברשותך" /></div>
          </div>
          <div className='field'>
            <div>סיסמא</div>
            <div><input type='text' name='device_password' value={state.device_password} onChange={this.handleChange} placeholder="הזן את הסיסמא הרשומה על גב ההתקן" /></div>
          </div>

          <footer>
            <div className='cancel'><button   type="reset">ביטול</button></div>
            <div className='confirm'><button  type="submit">אישור</button></div>
          </footer>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({insertList}, dispatch);
}

export default connect(null,mapDispatchToProps)(AddList);
