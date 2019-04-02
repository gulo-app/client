import React, {Component} from 'react';
import './style.scss';
import _ from 'lodash';
import {withRouter}     from 'react-router-dom';
import {connect}        from 'react-redux';
import Icon             from '../../Misc/Icon';
import MenuToggler      from '../../Misc/MenuToggler';
import Product          from './Product';


class ViewList extends Component{
  renderListProducts(){
    let {list_id} = this.props.match.params;
    let list      = this.props.lists[list_id];
    let products =_.map(list.products, (product) => {
      return <Product key={product.id} product={product} />
    });
    return products;
  }
  render(){
    let {lists} = this.props;
    if(_.size(lists)===0) return null;
    let {list_id} = this.props.match.params;
    let list = lists[list_id];
    return(
      <div className='Page ViewList'>
        <header>
          <div className='right'><MenuToggler /></div>
          <div className='title'>{list.list_name}</div>
          <div className='left'><Icon icon='arrow-left' size='2x' onClick={() => this.props.history.goBack()} /></div>
        </header>
        <main className='list-products'>
          {this.renderListProducts()}
        </main>
        <footer>
          <button onClick={this.toggleIsNew}><Icon icon="plus" />רשימה חדשה </button>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = ({lists}) => {return {lists} };
export default withRouter(connect(mapStateToProps)(ViewList));
