import React, {Component} from 'react';
import './style.scss';
import _ from 'lodash';
import {API_CALL}       from '../../../consts';
import {connect}        from 'react-redux';
import Icon             from '../../Misc/Icon';
import MenuToggler      from '../../Misc/MenuToggler';
import ShoppingCart     from './ShoppingCart';


class BestShoppingCart extends Component{
  constructor(props){
    super(props);
    this.state = {carts: []};
    this.fetchCarts = this.fetchCarts.bind(this);
  }
  componentDidMount(){
    this.fetchCarts();
  }
  async fetchCarts(){
    let {list} = this.props;
    if(!list){
      setTimeout(this.fetchCarts, 300);
      return false;
    }
    let carts = await API_CALL('GET', `/list/${list.list_id}/bestShoppingCart`);
    this.setState({carts});
  }
  renderShoppingCarts(){
    let {carts} = this.state;
    return _.map(carts, (cart) => {
      return <ShoppingCart key={cart.shopping_cart_firm_id} cart={cart}
                products={_.toArray(this.props.list.products)}
             />
    })
  }
  render(){
    let {list}  = this.props;
    if(!list) return null;
    
    return(
      <div className='Page BestShoppingCart'>
        <header>
          <div className='right'><MenuToggler /></div>
          <div className='title'>
            <div className='primary'>סל הקניות הזול ביותר</div>
            <div className='secondary'>{list.list_name}</div>
          </div>
          <div className='left'><Icon icon='arrow-left' size='2x' onClick={() => this.props.history.goBack()} /></div>
        </header>
        <main className='cart-list'>
          {this.renderShoppingCarts()}
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({lists}, ownProps) => {return {list: lists[ownProps.match.params.list_id]}};
export default connect(mapStateToProps)(BestShoppingCart);
