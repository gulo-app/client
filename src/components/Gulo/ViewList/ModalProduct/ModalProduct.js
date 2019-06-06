import React, {Component} from 'react';
import './style.scss';
import Icon         from  '../../../Misc/Icon';
import {API_CALL}   from '../../../../consts';

class ModalProduct extends Component{
  constructor(props){
    super(props);
    let {product} = this.props;
    this.state = {quantity: product.quantity, memo: product.memo ? product.memo : ''};

    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.handleMemo       = this.handleMemo.bind(this);
    this.submit           = this.submit.bind(this);
    this.delete           = this.delete.bind(this);
  }
  increaseQuantity(){
    let {quantity} = this.state;
    this.setState({quantity: quantity+1});
  }
  decreaseQuantity(){
    let {quantity} = this.state;
    if(quantity===1) return false;
    this.setState({quantity: quantity-1});
  }
  handleMemo(e){
    let {value} = e.target;
    this.setState({memo: value});
  }
  submit(e){
    e.preventDefault();
    let product = {...this.props.product, ...this.state};
    API_CALL('POST', `/list/${product.list_id}/product/${product.id}`, {product}).then((cb) => {
      this.props.close();
    });
  }
  delete(){
    let {product} = this.props;
    if(!product.id)
      return false;

    API_CALL('DELETE', `/list/${product.list_id}/product/${product.id}`, {product_id: product.id}).then((cb) => {
      this.props.close();
    });
  }
  render(){
    let {product} = this.props;
    if(!product) return null;
    return(
      <div className='ModalProduct'>
        <header className='modal-header'>
          <div className='title'>עריכת מוצר</div>
          <div className='left'><Icon icon="trash" color='#f95d49;' onClick={this.delete}/></div>
        </header>
        <form onSubmit={this.submit} onReset={this.props.close}>
          <div className='product_name'>{product.product_name}</div>
          <div className='quantity'>
            <div><Icon icon='plus'  onClick={this.increaseQuantity}/></div>
            <div className='number'>{this.state.quantity}</div>
            <div><Icon icon='minus' onClick={this.decreaseQuantity}/></div>
          </div>
          <div className='memo'>
            <textarea value={this.state.memo} placeholder="הערות..." onChange={this.handleMemo}/>
          </div>
          <footer>
            <div className='cancel'><button   type="reset">ביטול</button></div>
            <div className='confirm'><button  type="submit">אישור</button></div>
          </footer>
        </form>
      </div>
    );
  }
}

export default ModalProduct;
