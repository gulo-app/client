import React, {Component} from 'react';
import './style.scss';
import {withRouter, Redirect}     from 'react-router-dom';
import {connect}        from 'react-redux';
import {bindActionCreators} from 'redux';
import {markRead, confirmNotification}           from '../../../actions/notification';

import Icon             from '../../Misc/Icon';
import MenuToggler      from '../../Misc/MenuToggler';

class ViewNotification extends Component{
  componentDidMount(){
    let {noti} = this.props;
    if(!noti) return <Redirect to='/notifications' />;
    if(noti.isRead===0)
      this.props.markRead(this.props.noti.notification_id);
  }
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
    if(!noti) return <Redirect to='/notifications' />;
    return(
      <div className='Page ViewNotification'>
        <header>
          <div className='right'><MenuToggler /></div>
          <div className='title'>{noti.topic}</div>
          <div className='left'><Icon icon='arrow-left' size='2x' onClick={() => this.props.history.goBack()} /></div>
        </header>
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

const mapStateToProps = ({notifications}, ownProps) => {return {noti: notifications[ownProps.match.params.notification_id]}};
function mapDispatchToProps(dispatch){
  return bindActionCreators({markRead, confirmNotification}, dispatch);
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ViewNotification));
