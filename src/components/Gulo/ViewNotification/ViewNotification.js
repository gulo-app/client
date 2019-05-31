import React, {Component} from 'react';
import './style.scss';
import {withRouter, Redirect}     from 'react-router-dom';
import {connect}        from 'react-redux';
import {bindActionCreators} from 'redux';
import {markRead, deleteNotification}           from '../../../actions/notification';

import Icon             from '../../Misc/Icon';
//import MenuToggler      from '../../Misc/MenuToggler';
import SharedList       from './SharedList';
import ScanNotExists    from './ScanNotExists';
import VerifyProduct    from './VerifyProduct';

class ViewNotification extends Component{
  constructor(props){
    super(props);
    this.renderNotification = this.renderNotification.bind(this);
    this.deleteNotification = this.deleteNotification.bind(this);
  }
  componentDidMount(){
    let {noti} = this.props;
    if(!noti) return <Redirect to='/notifications' />;
    if(noti.isRead===0)
      this.props.markRead(this.props.noti.notification_id);
  }
  renderNotification(){
    let {noti} = this.props;
    let type = noti.notification_type_id;
    switch(type){
      case 1:
        return <SharedList noti={noti} />
      case 3:
        return <ScanNotExists noti={noti} />
      case 4:
        return <VerifyProduct noti={noti} />
      default:
        return null;
    }
  }
  deleteNotification(){
    let {noti} = this.props;
    this.props.deleteNotification(noti.notification_id);
    this.props.history.goBack();
  }
  render(){
    let {noti} = this.props;
    console.log(noti);
    // if(!noti) return <Redirect to='/notifications' />;
    if(!noti) return null;
    return(
      <div className='Page ViewNotification'>
        <header>
          <div className='right'><Icon className='trash' icon='trash' hoverColor='red' onClick={this.deleteNotification} /></div>
          <div className='title'>{noti.topic}</div>
          <div className='left'><Icon icon='arrow-left' size='2x' onClick={() => this.props.history.goBack()} /></div>
        </header>
        
        {this.renderNotification()}
      </div>
    );
  }
}

const mapStateToProps = ({notifications}, ownProps) => {return {noti: notifications[ownProps.match.params.notification_id]}};
function mapDispatchToProps(dispatch){
  return bindActionCreators({markRead, deleteNotification}, dispatch);
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ViewNotification));
