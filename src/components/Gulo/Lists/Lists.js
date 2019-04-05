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
import ModalList from './ModalList';

class Lists extends Component{
  constructor(props){
    super(props);
    this.state = {isModal: false, editList: null};
    this.toggleIsModal      =     this.toggleIsModal.bind(this);
  }
  componentDidMount(){
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      //this.props.history.goForward();
    });
  }
  toggleIsModal(){
    let isModal = !(this.state.isModal);
    this.setState({isModal}, () => {
      if(!isModal)
        this.setState({editList: null});
    });
  }
  renderLists(){
    let {lists} = this.props;
    return _.map(lists, (list) => {
      return <List key={list.list_id} list={list}
                showList={() => this.props.history.push(`/list/${list.list_id}`)}
                editList={() => this.setState({editList: list, isModal: true})}
            />
    })
  }
  renderEmpty(){
    return <EmptyList/>
  }

  render(){
    let {lists} = this.props;
    return(
      <div className='Page Lists'>
        <Modal isOpen={this.state.isModal} ><ModalList list={this.state.editList} close={this.toggleIsModal} /></Modal>

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
          <button onClick={this.toggleIsModal}><Icon icon="plus" />רשימה חדשה </button>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = ({lists, socket}) => {return {lists, socket} };

export default withRouter(connect(mapStateToProps)(Lists));
