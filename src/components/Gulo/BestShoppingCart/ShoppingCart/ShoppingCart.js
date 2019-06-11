import React, {Component} from 'react';
import './style.scss';
import _ from 'lodash';
class ShoppingCart extends Component{
  constructor(props){
    super(props);
    this.state = {isExpand: false};

    this.toggleExpand   =     this.toggleExpand.bind(this);
  }
  toggleExpand(){
    let isExpand = !(this.state.isExpand);
    this.setState({isExpand});
  }
  renderExpand(){
    let {cart, products} = this.props;
    let missing_products = _.differenceBy(products, cart.products, 'barcode');

    return (
      <div className='expand'>
        {_.map(cart.products, (p) => {
          return (
            <div key={p.barcode} className='row'>
              <div>{p.product_name}</div>
              <div>{p.price}₪</div>
            </div>
          );
        })}
        <div className='total'>
          <div className='row'>
            <div>סה"כ</div>
            <div>{_.sumBy(cart.products, 'price')}</div>
          </div>
        </div>
      </div>
    );
  }
  render(){
    let {cart, products} =  this.props;
    let {isExpand}       =  this.state;
    if(!cart) return null;
    let missing_products = _.differenceBy(products, cart.products, 'barcode');

    return(
      <div className='ShoppingCart' onClick={this.toggleExpand}>
        <div className='logo'>
          <img src={cart.firm_logo} alt='' />
        </div>
        <main>
          <div className='row'>
            <div>עלות:</div>
            <div>{cart.total_price} ₪</div>
          </div>
          <div className='row'>
            <div>מספר חוסרים: </div>
            <div>{missing_products.length}</div>
          </div>
          {isExpand && this.renderExpand()}
        </main>
      </div>
    );
  }
}

export default ShoppingCart;
