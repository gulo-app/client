import React, {Component}   from 'react';
import './style.scss';
import '../../FontAwesomeLib';
import SocketListener from './SocketListener';

import {Route, Switch}                  from  'react-router-dom';
import {connect}                        from 'react-redux';
import {fetchLists}         from '../../actions/list';

import VerifyAuth   from '../VerifyAuth';
import SideMenu     from  './SideMenu';
import Lists        from  './Lists';
import AddList      from  './AddList/AddList';
import ViewList     from  './ViewList';

class Gulo extends Component{
  componentDidMount(){
    this.props.fetchLists();
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
          <Route path='/addList' component={AddList}/>
          <Route path='/list/:list_id' component={ViewList}/>
          <Route path='/' component={Lists}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => {return {user} };

export default connect(mapStateToProps, {fetchLists})(Gulo);
