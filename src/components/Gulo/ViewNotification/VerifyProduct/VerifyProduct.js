import React, {Component} from 'react';
import './style.scss';
import moment from 'moment';
import Icon from '../../../Misc/Icon';
import Modal from   '../../../Misc/MyModal';
import ModalBarcode from '../ModalBarcode';
import {API_CALL} from '../../../../consts';

class VerifyProduct extends Component{
  constructor(props){
    super(props);
    this.state = {isModal: false}
    this.toggleIsModal        = this.toggleIsModal.bind(this);
    this.renderVerifyQuestion = this.renderVerifyQuestion.bind(this);
    this.renderVerified       = this.renderVerified.bind(this);
    this.renderOverwrited     = this.renderOverwrited.bind(this);

    this.overwrite            = this.overwrite.bind(this);
    this.verify               = this.verify.bind(this);
  }
  toggleIsModal(){
    let isModal = !(this.state.isModal);
    this.setState({isModal});
  }
  verify(){
    const {notification_id, product} = this.props.noti;
    API_CALL('POST', `/notification/${notification_id}/verifyProduct`, {product}).then((cb) => {
      console.log(cb);
    });
  }
  overwrite(product){
    const {notification_id} = this.props.noti;
    API_CALL('POST', `/notification/${notification_id}/overwriteProduct`, {product}).then((cb) => {
      this.toggleIsModal();
    });
  }
  renderVerifyQuestion(){
    let {noti} = this.props;
    console.log(noti);
    return(
      <div className='VerifyQuestion'>
        <div className='product-details'>
           <div className='product-name'>{noti.product.product_name}</div>
           <div>
             <div>מחלקה:</div>
             <div>{noti.product.category_name}</div>
           </div>
           <div>
             <div>מותג:</div>
             <div>{noti.product.brand_name}</div>
           </div>
           <div>
             <div>כמות:</div>
             <div>{noti.product.capacity} {noti.product.unit_name}</div>
           </div>
        </div>
      </div>
    );
  }
  renderOverwrited(){
    let {noti} = this.props;
    let {product} = noti;
    return(
      <div className='Overwrited'>
        <div className='product-name'>{product.barcode} - {product.product_name}</div>
        <div className='desc'>נערך בהצלחה</div>
        <div className='thanks'>תודה רבה על תרומתך למערכת Gulo</div>
      </div>
    );
  }
  renderVerified(){
    let {noti} = this.props;
    let {product} = noti;
    return(
      <main className='Verified'>
        <div className='product-name'>{product.barcode} - {product.product_name}</div>
        <div className='desc'>אימות התקבל</div>
        <div className='thanks'>תודה רבה על תרומתך למערכת Gulo</div>
      </main>
    );
  }
  render(){
    let {noti}    =   this.props;
    let {status}  =   noti;
    if(!noti) return null;
    let barcode = noti.subject_id;
    let isToday = moment(noti.createdAt).isSame(moment(), 'date');
    return(
      <div className='VerifyProduct'>
        <Modal isOpen={this.state.isModal} >
          <ModalBarcode close={this.toggleIsModal} barcode={noti.subject_id} noti={noti} onSubmit={this.overwrite} />
        </Modal>
        <main>
          <div className='title'>
            <div className='topic'>
                מוצר נסרק ואינו זוהה
                <div className='barcode'>
                  ברקוד: {barcode}
                  {status===1   &&  <div>ממתין לאימות</div>}
                  {status===10  && <div>המוצר אומת</div>}
                  {status===100 && <div>המוצר נערך מחדש</div>}
                </div>
            </div>
            <div className='at'>
              <div className='time'>{moment(noti.createdAt).format('HH:mm')}</div>
              {!isToday && <div className='date'>{moment(noti.createdAt).format('DD/MM/YY')}</div>}
            </div>
          </div>
          <div className={`img ${(status===1 || status===10) && 'smaller'}`}>
            <Icon icon='barcode'/>
          </div>
          <div className='memo'>
            {status===1   && this.renderVerifyQuestion()}
            {status===10  && this.renderVerified()}
            {status===100 && this.renderOverwrited()}
          </div>
        </main>
        {status===1 && <footer>
          <button onClick={this.verify}>אימות מוצר</button>
          <button className='secondary' onClick={this.toggleIsModal}>עריכה</button>
        </footer>}
      </div>
    );
  }
}

export default VerifyProduct;
