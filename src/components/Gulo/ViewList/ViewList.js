import React, {Component} from 'react';
import './style.scss';
import _ from 'lodash';
import {withRouter}     from 'react-router-dom';
import {connect}        from 'react-redux';
import {API_CALL}       from '../../../consts';
import Icon             from '../../Misc/Icon';
import MenuToggler      from '../../Misc/MenuToggler';
import Product          from './Product';


class ViewList extends Component{
  constructor(props){
    super(props);
    this.state = {list:null, products:[]}

    this.setList          =     this.setList.bind(this);
    this.fecthProducts    =     this.fecthProducts.bind(this);
  }
  componentDidMount(){
    this.setList();
  }
  componentDidUpdate(prevProps){
    if(prevProps.lists.length===0 && this.props.lists.length>0)
        this.setList();
  }
  setList(){
    let {lists} = this.props;
    if(lists.length===0) return false;
    let list_id = Number(this.props.match.params.list_id);
    let list = _.find(lists, {list_id});
    this.setState({list}, () => this.fecthProducts());
  }
  fecthProducts(){
    console.log("fetch products");
    let {list_id} = this.state.list;
    API_CALL('GET', `/list/${list_id}/product`).then((products) => {
      this.setState({products});
    }).catch((e) => {
      this.props.history.push(`/login`);
    });
  }
  renderListProducts(){
    let Products = _.map(this.state.products, (product) => {
      return <Product key={product.barcode} product={product} />
    })
    return Products;
  }
  render(){
    let {list} = this.state;
    if(!list) return null;

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
