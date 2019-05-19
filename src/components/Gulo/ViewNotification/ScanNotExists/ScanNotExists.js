import React, {Component} from 'react';
import './style.scss';
import moment from 'moment';
import Icon from '../../../Misc/Icon';
import Modal from   '../../../Misc/MyModal';
import ModalBarcode from './ModalBarcode';

class ScanNotExists extends Component{
  constructor(props){
    super(props);
    this.state = {isModal: false}
    this.toggleIsModal = this.toggleIsModal.bind(this);
  }
  toggleIsModal(){
    let isModal = !(this.state.isModal);
    this.setState({isModal});
  }
  render(){
    let {noti} = this.props;
    if(!noti) return null;
    let barcode = noti.subject_id;
    let isToday = moment(noti.createdAt).isSame(moment(), 'date');
    return(
      <div className='ScanNotExists'>
        <Modal isOpen={this.state.isModal} ><ModalBarcode close={this.toggleIsModal} /></Modal>
        <main>
          <div className='title'>
            <div className='topic'>
                מוצר נסרק ואינו זוהה
                <div className='barcode'>
                  ברקוד: {barcode}
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
            האם ברצונך לתרום לקהילת גולו
            <br/>
            ולהוסיף את פרטי המוצר?
          </div>
        </main>
        <footer>
          <button onClick={this.toggleIsModal}>הוסף מוצר למאגר</button>
        </footer>
      </div>
    );
  }
}

export default ScanNotExists;
