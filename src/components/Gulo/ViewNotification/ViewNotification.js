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
    if(type===1)
      return <SharedList noti={noti} />
    if(type===3)
      return <ScanNotExists noti={noti} />
  }
  deleteNotification(){
    let {noti} = this.props;
    this.props.deleteNotification(noti.notification_id);
    this.props.history.goBack();
  }
  render(){
    let {noti} = this.props;
    if(!noti) return <Redirect to='/notifications' />;
    return(
      <div className='Page ViewNotification'>
        <header>
          <div className='right'><Icon className='trash' icon='trash' hoverColor='red' onClick={this.deleteNotification} /></div>
          <div className='title'>{noti.topic}</div>
          <div className='left'><Icon icon='arrow-left' size='2x' onClick={() => this.props.history.goBack()} /></div>
        </header>
        <main>
          {this.renderNotification()}
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({notifications}, ownProps) => {return {noti: notifications[ownProps.match.params.notification_id]}};
function mapDispatchToProps(dispatch){
  return bindActionCreators({markRead, deleteNotification}, dispatch);
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ViewNotification));
