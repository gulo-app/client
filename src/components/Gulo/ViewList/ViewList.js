import React, {Component} from 'react';
import './style.scss';
import _ from 'lodash';
import {withRouter, Redirect}     from 'react-router-dom';
import {connect}        from 'react-redux';
import Icon             from '../../Misc/Icon';
import MenuToggler      from '../../Misc/MenuToggler';
import Product          from './Product';
import Modal            from  '../../Misc/MyModal';
import ModalProduct     from  './ModalProduct';
import OptionsToggler   from  './OptionsToggler';
//import BarcodeScanner   from './BarcodeScanner';


class ViewList extends Component{
  constructor(props){
    super(props);
    this.state = {isScan: false, product_id: null};

    this.toggleScan     = this.toggleScan.bind(this);
    this.setProductID   = this.setProductID.bind(this);
    this.shareWhatsapp  = this.shareWhatsapp.bind(this);
  }
  toggleScan(){
    let isScan = !(this.props.isScan);
    this.setState({isScan});
  }
  setProductID(product_id){
    this.setState({product_id});
  }
  renderListProducts(){
    let {list}  =  this.props;
    let products =_.map(list.products, (product) => {
      return <Product key={product.id} product={product} onEdit={() => this.setProductID(product.id)} />
    });
    return products;
  }
  shareWhatsapp(){
    let text = '';
    let {list}  =  this.props;

    _.map(list.products, (p) => {
      if(p.isChecked) return false;
      text += `${p.product_name} \n`;
    });
    window.open(`https://wa.me/?text=${encodeURI(text)}`);
  }
  render(){
    let {list} = this.props;
    //if(!list) return <Redirect to='/' />;
    if(!list) return null;
    let {product_id} = this.state;
    return(
      <div className='Page ViewList'>
        <Modal isOpen={product_id ? true : false} close={() => this.setProductID(null)}>
          <ModalProduct product={list.products[product_id]} close={() => this.setProductID(null)} />
        </Modal>

        <header>
          <div className='right'><MenuToggler /></div>
          <div className='title'>{list.list_name}</div>
          <div className='left'><Icon icon='arrow-left' size='2x' onClick={() => this.props.history.goBack()} /></div>
        </header>
        <main className='list-products'>
          {this.renderListProducts()}
        </main>
        <footer>
          <OptionsToggler shareWhatsapp={this.shareWhatsapp}/>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = ({lists}, ownProps) => {return {list: lists[ownProps.match.params.list_id]}};
export default withRouter(connect(mapStateToProps)(ViewList));
