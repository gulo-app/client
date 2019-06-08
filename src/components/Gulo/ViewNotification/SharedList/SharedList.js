import React, {Component} from 'react';
import './style.scss';
import {connect}              from 'react-redux';
import {bindActionCreators}   from 'redux';
import {confirmNotification}  from '../../../../actions/notification';
import moment from 'moment';
import Icon from '../../../Misc/Icon';

class SharedList extends Component{
  isConfirmation(){
    let {noti} = this.props;
    if(noti.isConfirm===0)
      return null;
    return (<footer className='confirmation'>
              <button onClick={() => this.props.confirmNotification(noti.notification_id)}>אישור</button>
            </footer>
    );
  }
  render(){
    let {noti} = this.props;
    let {status} = noti;
    if(!noti) return null;
    let isToday = moment(noti.createdAt).isSame(moment(), 'date');
    let icon;
    if(status===1) //wait for confirmation
      icon = 'share-alt'
    else if(status===2 || status===3) //user removed from list
      icon = 'user-times';
    else if(status===4 || status===10) //user joined group
      icon = 'handshake';
    return(
      <div className='SharedList'>
        <main>
          <div className='title'>
            <div className='topic'>
                {noti.title.primary}
                <div className='secondary'>
                  {noti.title.secondary}
                </div>
            </div>
            <div className='at'>
              <div className='time'>{moment(noti.createdAt).format('HH:mm')}</div>
              {!isToday && <div className='date'>{moment(noti.createdAt).format('DD/MM/YY')}</div>}
            </div>
          </div>
          <div className='img'>
            <Icon icon={icon}/>
          </div>
          <div className='question'>
            {noti.title.secondary}
          </div>
        </main>
        {this.isConfirmation()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({confirmNotification}, dispatch);
}

export default connect(null,mapDispatchToProps)(SharedList);
