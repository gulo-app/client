import React, {Component} from 'react';
import './style.scss';
import {connect}              from 'react-redux';
import {bindActionCreators}   from 'redux';
import {confirmNotification}  from '../../../../actions/notification';

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
    if(!noti) return null
    return(
      <div className='SharedList'>
        <main>
          <div className='title'>
            {noti.title}
          </div>
          <div className='status'>
            {noti.status_topic}
          </div>
          {this.isConfirmation()}
        </main>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({confirmNotification}, dispatch);
}

export default connect(null,mapDispatchToProps)(SharedList);
