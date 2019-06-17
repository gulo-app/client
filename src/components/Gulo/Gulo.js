import React, {Component}   from 'react';
import './style.scss';
import '../../FontAwesomeLib';
import SocketListener from './SocketListener';

import {Route, Switch}                  from  'react-router-dom';
import {connect}                        from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchLists}         from '../../actions/list';
import {fetchNotifications} from '../../actions/notification';

import VerifyAuth   from '../VerifyAuth';
import SideMenu     from  './SideMenu';
import Lists        from  './Lists';
import ViewList     from  './ViewList';

import Notifications    from './Notifications';
import ViewNotification from './ViewNotification';
import BestShoppingCart from './BestShoppingCart';

class Gulo extends Component{
  constructor(props){
    super(props);
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount(){
    this.fetchData();
  }
  componentDidUpdate(prevProps){
    if(!prevProps.user && this.props.user)
      this.fetchData();
  }
  fetchData(){
    if(!this.props.user) return false;
    this.props.fetchLists();
    this.props.fetchNotifications();
  }
  render(){
    const {user} = this.props;
    return(
      <>
        <VerifyAuth/>
        {user &&
          <div className='Gulo'>
            <SocketListener />
            <SideMenu />
            <Switch>
              <Route path='/list/:list_id/bestShoppingCart' component={BestShoppingCart}/>
              <Route path='/list/:list_id' component={ViewList}/>
              <Route path='/notifications/:notification_id' component={ViewNotification}/>
              <Route path='/notifications' component={Notifications}/>
              <Route path='/' component={Lists}/>
            </Switch>
          </div>
        }
      </>
    );
  }
}

const mapStateToProps = ({user}) => {return {user} };
function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchLists, fetchNotifications}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Gulo);
