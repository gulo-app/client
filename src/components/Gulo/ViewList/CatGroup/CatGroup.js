import React, {Component} from 'react';
import './style.scss';
import _ from 'lodash';
import Product            from '../Product';

class CatGroup extends Component{
  constructor(props){
    super(props);
    this.state = {isExpand: true};

    this.toggleExpand     =     this.toggleExpand.bind(this);
  }
  toggleExpand(){
    let isExpand = !(this.state.isExpand);
    this.setState({isExpand});
  }
  renderProducts(){
    let products =_.map(this.props.cat, (product) => {
      return <Product key={product.id} product={product} onEdit={() => this.props.setProduct(product)} />
    });
    return products;
  }
  render(){
    let {cat} = this.props;
    if(cat.length===0) return null;
    const cat_name = cat[0].category_name;
    const {isExpand} = this.state;
    let unCheckedProducts = _.filter(cat, (product) => product.isChecked===0).length;
    return(
      <div className='CatGroup'>
        <div className='header' onClick={this.toggleExpand}>
          <div>{isExpand ? '-' : '+'}</div>
          <div>{cat_name}</div>
          <div className='counter'>({unCheckedProducts})</div>
        </div>
        <div className='products'>
          {isExpand && this.renderProducts()}
        </div>
      </div>
    );
  }
}

export default CatGroup;
