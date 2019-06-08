import React, {Component} from 'react';
import './style.scss';
import Icon         from  '../../../Misc/Icon';
import {API_CALL}   from '../../../../consts';

class ModalProduct extends Component{
  constructor(props){
    super(props);
    let {product} = this.props;
    if(product)
      this.state = {product_name: product.product_name, quantity: product.quantity, memo: product.memo ? product.memo : ''};
    else
      this.state = {product_name: '', quantity: 1, memo: ''};

    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.handleMemo       = this.handleMemo.bind(this);
    this.delete           = this.delete.bind(this);
    this.update           = this.update.bind(this);
    this.new              = this.new.bind(this);
  }
  componentDidMount(){
    if(this.product_name)
      this.product_name.focus();
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
  update(e){
    e.preventDefault();
    let product = {...this.props.product, ...this.state};
    let p_route = product.isManual ? 'manual_product' : 'product';
    API_CALL('PUT', `/list/${product.list_id}/${p_route}/${product.id}`, {product}).then((cb) => {
      this.props.close();
    });
  }
  new(e){
    e.preventDefault();
    let product = {...this.state};
    API_CALL('POST', `/list/${this.props.list.list_id}/manual_product`, {product}).then((cb) => {
      this.props.close()
    });
  }

  delete(){
    let {product} = this.props;
    if(!product.id)
      return false;

    let p_route = product.isManual ? 'manual_product' : 'product';
    API_CALL('DELETE', `/list/${product.list_id}/${p_route}/${product.id}`, {product_id: product.id}).then((cb) => {
      this.props.close();
    });
  }
  render(){
    let {product} = this.props;

    return(
      <div className='ModalProduct'>
        <header className='modal-header'>
          <div className='title'>עריכת מוצר</div>
          <div className='left'><Icon icon="trash" color='#f95d49;' onClick={this.delete}/></div>
        </header>
        <form onSubmit={product ? this.update : this.new} onReset={this.props.close}>
          {product && <div className='product_name'>{product.product_name}</div>}
          {!product &&
            <div className='field'>
              <div>שם המוצר</div>
              <div><input type='text' name='product_name' value={this.state.product_name} onChange={(e) => this.setState({product_name: e.target.value})} placeholder="לדוגמא: מלפפון" required ref={(input) => {this.product_name=input}} /></div>
            </div>
          }
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
