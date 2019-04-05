import React, {Component} from 'react';
import './style.scss';
import Icon from '../../../Misc/Icon';

class List extends Component{
  render(){
    let {list} = this.props;
    return(
      <div className='List'>
        <div className='icon' style={{background: list.list_type_color}} onClick={this.props.showList}><Icon icon={list.list_type_icon} size='2x'/></div>
        <div className='title' onClick={this.props.showList}>
          <div className='name'>{list.list_name}</div>
          {/*<div className='total'><span className='total'>({list.total_products} פריטים)</span></div>*/}
          <div className='mail'>{list.creator_mail}</div>
        </div>
        <div className='options' onClick={this.props.editList}><Icon icon='ellipsis-v' size='2x' /></div>
      </div>
    );
  }
}

export default List;
