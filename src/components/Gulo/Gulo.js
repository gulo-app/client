import React, {Component}   from 'react';
import './style.scss';
import '../../FontAwesomeLib';
import SocketListener from './SocketListener';

import {Route, Switch}                  from  'react-router-dom';
import {connect}                        from 'react-redux';
import {fetchLists}         from '../../actions/list';
import {fetchNotifications} from '../../actions/notification';

import VerifyAuth   from '../VerifyAuth';
import SideMenu     from  './SideMenu';
import Lists        from  './Lists';
import ViewList     from  './ViewList';

import Notifications    from './Notifications';
import ViewNotification from './ViewNotification';


class Gulo extends Component{
  componentDidMount(){
    this.props.fetchLists();
    this.props.fetchNotifications();
  }

  render(){
    const {user} = this.props;
    if(!user) return <VerifyAuth/>
    return(
      <div className='Gulo'>
        <VerifyAuth/>
        <SocketListener />
        <SideMenu />
        <Switch>
          <Route path='/list/:list_id' component={ViewList}/>
          <Route path='/notifications/:notification_id' component={ViewNotification}/>
          <Route path='/notifications' component={Notifications}/>
          <Route path='/' component={Lists}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => {return {user} };

export default connect(mapStateToProps, {fetchLists, fetchNotifications})(Gulo);
