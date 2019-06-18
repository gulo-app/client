import React, {Component} from 'react';
import './style.scss';
import _ from 'lodash';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {Plugins}        from '@capacitor/core';
import {API_CALL}       from '../../../consts';
import {withRouter}     from 'react-router-dom';
import {connect}        from 'react-redux';
import Icon             from '../../Misc/Icon';
import MenuToggler      from '../../Misc/MenuToggler';
import Modal            from  '../../Misc/MyModal';
import ModalProduct     from  './ModalProduct';
import OptionsToggler   from  './OptionsToggler';
import PlusToggler      from  './PlusToggler';
import CatGroup         from  './CatGroup';

class ViewList extends Component{
  constructor(props){
    super(props);
    this.state = {product: null, isManual: false, isOptions: false, isPlus: false, platform: '', shoppingMode: false};
    this.barcodeScanner = BarcodeScanner;

    this.checkListID        =     this.checkListID.bind(this);
    this.setPlatform        =     this.setPlatform.bind(this);
    this.toggleIsManual     =     this.toggleIsManual.bind(this);
    this.toggleIsOptions    =     this.toggleIsOptions.bind(this);
    this.toggleIsPlus       =     this.toggleIsPlus.bind(this);
    this.toggleShoppingMode =     this.toggleShoppingMode.bind(this);
    this.setProduct         =     this.setProduct.bind(this);
    this.shareWhatsapp      =     this.shareWhatsapp.bind(this);
    this.clearList          =     this.clearList.bind(this);
    this.goBestShoppingCart =     this.goBestShoppingCart.bind(this);
    this.scanBarcode        =     this.scanBarcode.bind(this);
  }
  componentDidMount(){
    this.setPlatform();
    setTimeout(this.checkListID, 1000);
  }
  async checkListID(){
      let {list} = this.props;
      if(!list)
        this.props.history.push('/');
  }
  async setPlatform(){
    const deviceInfo = await Plugins.Device.getInfo();
    this.setState({platform: deviceInfo.platform});
  }
  toggleIsManual(){
    let isManual = !(this.state.isManual);
    this.setState({isManual});
  }
  toggleIsOptions(){
    let isOptions = !(this.state.isOptions);
    this.setState({isOptions});
  }
  toggleIsPlus(){
    let isPlus = !(this.state.isPlus);
    this.setState({isPlus});
  }
  toggleShoppingMode(){
    let shoppingMode = !(this.state.shoppingMode);
    this.setState({shoppingMode});
  }
  setProduct(product){
    this.setState({product});
  }
  renderCatGroups(){
    let {list}  =   this.props;
    let cats  =   _.groupBy(list.products, 'category_id');
    cats.manual = _.toArray(list.manual_products);
    let Cats = _.map(cats, (cat,i) => {
      return <CatGroup key={i} cat={cat} setProduct={this.setProduct}/>
    })
    return Cats;
  }
  shareWhatsapp(){
    let text = '';
    let {list}  =  this.props;

    const arr = [..._.toArray(list.products), ..._.toArray(list.manual_products)];

    text += `*הרשימה ${list.list_name} שותפה ממערכת גולו:* \n\n`
    _.map(arr, (p) => {
      if(p.isChecked) return false;
      text += `${p.product_name}`;
      if(p.quantity>1)
        text += ` (${p.quantity})`;
      text += '\n';
    });
    window.open(`https://wa.me/?text=${encodeURI(text)}`);
  }
  clearList(){
    var j = window.confirm("האם לנקות את תוכן הרשימה?");
    if(j===false) return false;
    let {list}  =  this.props;
    API_CALL('POST', `/list/${list.list_id}/clear`);
  }
  goBestShoppingCart(){
    let {list} = this.props;
    let path = `/list/${list.list_id}/bestShoppingCart`;
    this.props.history.push(path);
  }
  async scanBarcode(){
    let {platform, shoppingMode} = this.state;
    if(platform!=='android' && platform!=='ios')
      return false;

    let {list: {list_id}} = this.props;
    this.barcodeScanner.scan().then(async barcode => {
      if(barcode.cancelled)
        return false;
      await API_CALL('POST', `/device/scanByMobile/${list_id}/${barcode.text}`, {shoppingMode});

      if(this.state.shoppingMode)
        this.scanBarcode(); //infinite scan in shoppingMode-> till user go back
    }).catch(err => console.log("Error", err));
  }
  render(){
    const {list,user} = this.props;
    if(!list) return null;

    const {product, isManual, isOptions, isPlus, platform, shoppingMode} = this.state;
    const isCreator = list.creator.mail===user.mail ? true : false;
    return(
      <div className='Page ViewList'>
        {(isOptions || isPlus) && <div className='overlay' onClick={() => this.setState({isOptions: false, isPlus: false})}></div>}
        <Modal isOpen={product ? true : false} close={() => this.setProduct(null)}>
          <ModalProduct product={product} close={() => this.setProduct(null)} />
        </Modal>
        <Modal isOpen={isManual} close={() => this.toggleIsManual()}>
          <ModalProduct product={null} list={list} close={() => this.toggleIsManual()} />
        </Modal>

        <header>
          <div className='right'><MenuToggler /></div>
          <div className='title'>
            {list.list_name}
          </div>
          <div className='left'><Icon icon='arrow-left' size='2x' onClick={() => this.props.history.goBack()} /></div>
        </header>
        <main className='list-products'>
          {this.renderCatGroups()}
        </main>
        <footer>
          <OptionsToggler className={isPlus && 'hidden'}
              isExpand={isOptions} toggle={this.toggleIsOptions} isCreator={isCreator} platform={platform}
              shareWhatsapp={this.shareWhatsapp} clearList={this.clearList} bestShoppingCart={this.goBestShoppingCart}
              toggleShoppingMode={this.toggleShoppingMode} shoppingMode={shoppingMode}
            />
            <PlusToggler className={isOptions && 'hidden'}
                isExpand={isPlus} toggle={this.toggleIsPlus}    isCreator={isCreator} platform={platform}
                manualProduct={this.toggleIsManual} scanBarcode={this.scanBarcode}
                shoppingMode={shoppingMode}
            />
        </footer>
      </div>
    );
  }
}

const mapStateToProps = ({lists, user}, ownProps) => {return {user, list: lists[ownProps.match.params.list_id]}};
export default withRouter(connect(mapStateToProps)(ViewList));
