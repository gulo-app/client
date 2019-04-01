import React, {Component}   from 'react';
import './style.scss';
import '../../FontAwesomeLib';
import {Route, Switch}      from  'react-router-dom';
import {connect}            from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchLists}         from '../../actions/list';

import VerifyAuth   from '../VerifyAuth';
import SideMenu     from  './SideMenu';
import Lists        from  './Lists';
import AddList      from  './AddList/AddList';
import ViewList     from  './ViewList';

class Gulo extends Component{
  constructor(props){
    super(props);
    this.fetchInitialData   =   this.fetchInitialData.bind(this);
  }
  componentDidMount(){
    this.fetchInitialData();
  }
  fetchInitialData(){
    this.props.fetchLists();
  }
  render(){
    const {user} = this.props;
    if(!user) return <VerifyAuth/>
    return(
      <div className='Gulo'>
        <VerifyAuth/>
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

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchLists}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Gulo);
