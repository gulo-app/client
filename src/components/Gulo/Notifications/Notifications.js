import React, {Component} from 'react';
import './style.scss';
import _ from 'lodash';
import {connect}            from 'react-redux';
import {bindActionCreators} from 'redux';
import {markUnNew}    from '../../../actions/notification';

import MenuToggler  from '../../Misc/MenuToggler';
import Icon from '../../Misc/Icon';
import Notification from './Notification';
import EmptyNotifications from './EmptyNotifications';

class Notifications extends Component{
  componentDidMount(){
    const newCounter    = _.filter(this.props.notifications, (noti) => noti.isNew===1).length;
    if(newCounter>0)
      this.props.markUnNew();
  }
  renderNotifications(){
    let arr = _.values(this.props.notifications);
    if(arr.length===0)
      return <EmptyNotifications />;

    let Notifications = _.map(arr.reverse(), (noti, i) => {
      return <Notification key={i} noti={noti} />
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
