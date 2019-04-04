import React, {Component} from 'react';
import './style.scss';
import {connect} from 'react-redux';
import _ from 'lodash';
import {withRouter} from 'react-router-dom';
import Icon from '../../Misc/Icon';
import EmptyList from './EmptyList';
import List from './List';
import MenuToggler  from '../../Misc/MenuToggler';
import Modal from   '../../Misc/MyModal';
import AddList from '../AddList';

class Lists extends Component{
  constructor(props){
    super(props);
    this.state = {isNew: false};
    this.toggleIsNew      =     this.toggleIsNew.bind(this);
  }
  componentDidMount(){
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      //this.props.history.goForward();
    });
  }
  toggleIsNew(){
    let isNew = !(this.state.isNew);
    this.setState({isNew});
  }
  renderLists(){
    let {lists} = this.props;
    return _.map(lists, (list) => {
      return <List key={list.list_id} list={list} />
    })
  }
  renderEmpty(){
    return <EmptyList/>
  }
  render(){
    let {lists} = this.props;
    return(
      <div className='Page Lists'>
        <Modal isOpen={this.state.isNew} ><AddList close={this.toggleIsNew} closeTimeoutMS={1000} /></Modal>

        <header>
          <div className='right'><MenuToggler /></div>
          <div className='title'>הרשימות שלי</div>
          <div className='left'><Icon icon='search' size='2x' /></div>
        </header>
        <main className='lists'>
          {_.size(lists)>0   && this.renderLists()}
          {_.size(lists)===0 && this.renderEmpty()}
        </main>
        <footer>
          <button onClick={this.toggleIsNew}><Icon icon="plus" />רשימה חדשה </button>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = ({lists, socket}) => {return {lists, socket} };

export default withRouter(connect(mapStateToProps)(Lists));
