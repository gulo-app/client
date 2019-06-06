import React, {Component} from 'react';
import './style.scss';
import Modal from 'react-modal';
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.4)';

class MyModal extends Component{
  render(){
    return(
      <Modal
        isOpen={this.props.isOpen}
        ariaHideApp={false}
        className={`Modal ${this.props.className}`}
        shouldCloseOnOverlayClick={true}
        onRequestClose={this.props.close}
      >
          {this.props.children}
      </Modal>
    );
  }
}

export default MyModal;
