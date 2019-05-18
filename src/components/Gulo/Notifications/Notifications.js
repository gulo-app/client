import React, {Component} from 'react';
import './style.scss';
import _ from 'lodash';
import {connect}            from 'react-redux';
import {bindActionCreators} from 'redux';
import {markUnNew}    from '../../../actions/notification';

import MenuToggler  from '../../Misc/MenuToggler';
import Icon from '../../Misc/Icon';
import Notification from './Notification';

class Notifications extends Component{
  componentDidMount(){
    this.props.markUnNew();
  }
  renderNotifications(){
    let Notifications = _.map(this.props.notifications, (noti) => {
      return <Notification key={noti.notification_id} noti={noti} />
    })
    return Notifications;
  }
  render(){
    return(
      <div className='Page Notifications'>
        <header>
          <div className='right'><MenuToggler /></div>
          <div className='title'>התראות</div>
          <div className='left'><Icon icon='arrow-left' size='2x' onClick={() => this.props.history.goBack()} /></div>
        </header>
        <main className='list-notifications'>
          {this.renderNotifications()}
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({notifications}) => {return {notifications}};
function mapDispatchToProps(dispatch){
  return bindActionCreators({markUnNew}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
