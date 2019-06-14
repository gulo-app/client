import React, {Component} from 'react';
import './style.scss';
import DataListAPI from '../../../Misc/DataListAPI';
import SelectAPI from '../../../Misc/SelectAPI';

class ModalBarcode extends Component{
  constructor(props){
    super(props);
    const product = this.props.noti.product;

    this.state = {
      barcode: this.props.barcode,
      product_name:     product ? product.product_name.split(' -')[0]  : '',
      category_id:      product ? product.category_id       : '',
      capacity_unit_id: product ? product.capacity_unit_id  : '',
      capacity:         product ? product.capacity          : '',
      brand_id:         product ? product.brand_id          : '',
      brand_text:       product ? product.brand_name        : ''
    }
    this.handleChange     =     this.handleChange.bind(this);
    this.submit           =     this.submit.bind(this);
  }
  componentDidMount(){
    this.product_name.focus();
  }
  handleChange(e){
    let {name, value} = e.target;    
    let stateObj = {}; stateObj[name] = value;
    this.setState(stateObj);
  }
  submit(e){
    e.preventDefault();
    this.props.onSubmit(this.state);
  }
  render(){
    let {state} = this;
    let {product} = this.props.noti;
    return(
      <div className='ModalBarcode'>
        <header className='modal-header'>
          <div className='title'>{product ? 'עריכת מוצר' : 'מוצר חדש'}</div>
        </header>
        <form onSubmit={this.submit} onReset={() => this.props.close()}>
          <header>פרטי המוצר</header>
            <div className='field'>
              <div>ברקוד</div>
              <div><input type='text' name='barcode' value={state.barcode} onChange={this.handleChange} required readOnly /></div>
            </div>
          <div className='field'>
            <div>שם המוצר</div>
            <div><input type='text' name='product_name' value={state.product_name} onChange={this.handleChange} placeholder="לדוגמא: סבון כלים" required ref={(input) => {this.product_name=input}} /></div>
          </div>
          <header>פרטים נוספים</header>
          <div className='field row'>
            <div>חברה</div>
            <div>
              <DataListAPI api={{verb:'GET', url: '/db/brands'}} placeholder='לדוגמא: פיירי' required
                  name='brand_text' value={state.brand_text} onChange={this.handleChange}
                  onSelect={(val) => this.setState({brand_id: val})}
              />
            </div>
          </div>
          <div className='field row'>
            <div>קטגוריה</div>
            <div>
              <SelectAPI api={{verb:'GET', url: '/db/categories'}} placeholder='יש לבחור קטגוריה' required
                  name='category_id' value={state.category_id} onChange={this.handleChange}
              />
            </div>
          </div>
          <div className='field row'>
            <div>כמות</div>
            <div className='multiple'>
              <div><input type='number' name='capacity' value={state.capacity} onChange={this.handleChange} placeholder='650' required /></div>
              <div>
                <SelectAPI api={{verb:'GET', url: '/db/capacity_units'}} placeholder='יחידה' required
                    name='capacity_unit_id' value={state.capacity_unit_id} onChange={this.handleChange}
                />
              </div>
            </div>
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
