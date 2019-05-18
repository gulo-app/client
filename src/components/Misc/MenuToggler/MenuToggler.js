import React,{Component} from 'react';
import './style.scss';
import _ from 'lodash';
import Icon from '../Icon';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleMenu} from '../../../actions/UI';


class MenuToggler extends Component{
  toggleStatus(){
    this.props.toggleMenu();
  }
  render(){
    let {notifications} = this.props;
    //const newCounter    = _.filter(notifications, (noti) => noti.isNew===1).length;
    const unReadCounter = _.filter(notifications, (noti) => noti.isRead===0).length;

    return(
      <div className='MenuToggler'>
        {unReadCounter>0 &&<div className='badger'>
          {unReadCounter}
        </div>}
        <Icon icon='bars' size='2x' onClick={() => this.toggleStatus()} />
      </div>
    );
  }
}

const mapStateToProps = ({notifications}) => {return {notifications}};
function mapDispatchToProps(dispatch){
  return bindActionCreators({toggleMenu}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuToggler);
