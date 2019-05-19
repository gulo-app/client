import React, {Component} from 'react';
import './style.scss';
//import _ from 'lodash';

class ModalBarcode extends Component{
  constructor(props){
    super(props);
    this.state = {
      product_name: '',
      brand_id: 0,
      brand_text: '',
      capacity: 0,
      capacity_unit_id: 0
    }
    this.handleChange     =     this.handleChange.bind(this);
    this.submit           =     this.submit.bind(this);
  }
  handleChange(e){
    let {name, value} = e.target;
    let stateObj = {}; stateObj[name] = value;
    this.setState(stateObj);
  }
  submit(e){
    e.preventDefault();

  }
  render(){
    let {state} = this;
    return(
      <div className='ModalBarcode'>
        <header className='modal-header'>
          <div className='title'>מוצר חדש</div>
        </header>
        <form onSubmit={this.submit} onReset={() => this.props.close()}>
          <header>פרטי המוצר</header>
          <div className='field'>
            <div>שם המוצר</div>
            <div><input type='text' name='product_name' value={state.product_name} onChange={this.handleChange} placeholder="שם המוצר..." required /></div>
          </div>
          <footer>
            <div className='cancel'><button   type="reset">ביטול</button></div>
            <div className='confirm'><button  type="submit">אישור</button></div>
          </footer>
        </form>
      </div>
    );
  }
}

export default ModalBarcode;
