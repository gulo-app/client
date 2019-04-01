import React,{Component} from 'react';
import Icon from '../Icon';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleMenu} from '../../../actions/UI';


class MenuToggler extends Component{
  toggleStatus(){
    this.props.toggleMenu();
  }
  render(){
    return(
      <Icon icon='bars' size='2x' onClick={() => this.toggleStatus()} />
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({toggleMenu}, dispatch);
}

export default connect(null, mapDispatchToProps)(MenuToggler);
