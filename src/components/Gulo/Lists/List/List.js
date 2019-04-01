import React, {Component} from 'react';
import './style.scss';
import Icon from '../../../Misc/Icon';
import {withRouter} from 'react-router-dom'


class List extends Component{
  showList(){
    let {list} = this.props;
    this.props.history.push(`/list/${list.list_id}`);
  }
  render(){
    let {list} = this.props;
    return(
      <div className='List' onClick={() => this.showList()}>
        <div className='icon' style={{background: list.list_type_color}}><Icon icon={list.list_type_icon} size='2x'/></div>
        <div className='title'>
          <div className='name'>{list.list_name}</div>
          {/*<div className='total'><span className='total'>({list.total_products} פריטים)</span></div>*/}
          <div className='mail'>{list.creator_mail}</div>
        </div>
        <div className='options'><Icon icon='ellipsis-v' size='2x' /></div>
      </div>
    );
  }
}

export default withRouter(List);
