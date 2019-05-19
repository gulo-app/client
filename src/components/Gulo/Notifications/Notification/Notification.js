import React, {Component} from 'react';
import './style.scss';
import moment         from 'moment';
import {withRouter}   from 'react-router-dom';

class Notification extends Component{
  constructor(props){
    super(props);
    this.viewNotification = this.viewNotification.bind(this);
  }
  viewNotification(){
    let {notification_id} = this.props.noti;
    this.props.history.push(`/notifications/${notification_id}`);
  }

  render(){
      let {noti} = this.props;
      let isToday = moment(noti.modifiedAt).isSame(moment(), 'date');
      return(
        <div className={`Notification ${!noti.isRead && 'unRead'}`} onClick={this.viewNotification}>
          <div className='title'>
            <div className='primary'>{noti.title.primary}</div>
            <div className='secondary'>{noti.title.secondary}</div>
          </div>
          <div className='at'>
            <div className='time'>{moment(noti.modifiedAt).format('HH:mm')}</div>
            {!isToday && <div className='date'>{moment(noti.modifiedAt).format('DD/MM/YY')}</div>}
          </div>
        </div>
      );
  }
}

export default withRouter(Notification);
