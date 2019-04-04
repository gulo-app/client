import React,{Component} from 'react';
import './style.scss';
import {API_CALL}       from '../../../../consts';
import Icon             from '../../../Misc/Icon';

class Product extends Component{
  toggleCheck(){
    let {list_id, id} = this.props.product;
    API_CALL('POST', `/list/${list_id}/product/${id}/toggleCheck`);
  }
  render(){
    let {product} = this.props;
    const Quantity = product.quantity>1 ? <span className='quantity'>({product.quantity})</span> : null;
    return(
      <div className={`Product ${product.isChecked ? 'checked' : null}`}>
        <div className='product' onClick={() => this.toggleCheck()}>
          <div className='name'>{product.product_name}{Quantity}</div>
        </div>
        <div className='options'><Icon icon='ellipsis-v' size='1x' /></div>
      </div>
    );
  }
}

export default Product;
