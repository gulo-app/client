import React, {Component} from 'react';
import './style.scss';
import moment from 'moment';
import Icon from '../../../Misc/Icon';
import Modal from   '../../../Misc/MyModal';
import ModalBarcode from '../ModalBarcode';
import {API_CALL} from '../../../../consts';

class ScanNotExists extends Component{
  constructor(props){
    super(props);
    this.state = {isModal: false}

    this.toggleIsModal  =   this.toggleIsModal.bind(this);
    this.submit         =   this.submit.bind(this);
  }
  toggleIsModal(){
    let isModal = !(this.state.isModal);
    this.setState({isModal});
  }
  submit(newProduct){
    const {notification_id} = this.props.noti;
    API_CALL('POST', `/notification/${notification_id}/newProductForm`, {newProduct}).then((cb) => {
      this.toggleIsModal();
    });
  }
  render(){
    let {noti}    =   this.props;
    let {status}  =   noti;
    if(!noti) return null;
    let barcode = noti.subject_id;
    let isToday = moment(noti.createdAt).isSame(moment(), 'date');
    return(
      <div className='ScanNotExists'>
        <Modal isOpen={this.state.isModal} >
          <ModalBarcode close={this.toggleIsModal} barcode={noti.subject_id} noti={noti} onSubmit={this.submit} />
        </Modal>
        <main>
          <div className='title'>
            <div className='topic'>
                מוצר נסרק ואינו זוהה
                <div className='barcode'>
                  ברקוד: {barcode}
                  {status===10 &&
                    <div>
                      פרטי המוצר נשלחו בהצלחה
                    </div>
                  }
                </div>
            </div>
            <div className='at'>
              <div className='time'>{moment(noti.createdAt).format('HH:mm')}</div>
              {!isToday && <div className='date'>{moment(noti.createdAt).format('DD/MM/YY')}</div>}
            </div>
          </div>
          <div className='img'>
            <Icon icon='barcode'/>
          </div>
          <div className='question'>
            {status===1 &&
              <div>
                האם ברצונך לתרום לקהילת גולו
                <br/>
                ולהוסיף את פרטי המוצר?
              </div>
            }
            {status===10 &&
              <div>
                <div className='primary'>פרטי המוצר נשלחו בהצלחה</div>
                <br/><br/>
                תודה רבה על תרומתך למערכת Gulo
              </div>
            }
          </div>
        </main>
        {status===1 &&
           <footer>
             <button onClick={this.toggleIsModal}>הוסף מוצר למאגר</button>
           </footer>
        }
      </div>
    );
  }
}

export default ScanNotExists;
