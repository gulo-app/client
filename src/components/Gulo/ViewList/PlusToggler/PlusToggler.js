import React,{Component}  from 'react';
import './style.scss';
import Icon               from '../../../Misc/Icon';

class PlusToggler extends Component{
  renderFalse(){
    const {shoppingMode} = this.props;
    return(
      <div className='false'>
        <div><button className='expand' onClick={this.props.toggle}><Icon icon={!shoppingMode ? 'plus' : 'check'} /></button></div>
      </div>
    );
  }

  renderTrue(){
    const {platform} = this.props;
    return (
      <div className='true'>
        <div className='expand'><button className='expand' onClick={this.props.toggle}><Icon icon="times" /></button></div>
        {(platform==='ios' || platform==='android') &&
          <div className='option' onClick={() => {this.props.toggle(); this.props.scanBarcode();}}>
            <div className='icon'><Icon icon='barcode' /></div>
            <div className='desc'>סריקת ברקוד</div>
          </div>
        }
        <div className='option' onClick={() => {this.props.toggle(); this.props.manualProduct();}}>
          <div className='icon'><Icon icon='plus' /></div>
          <div className='desc'>הוספה ידנית</div>
        </div>
      </div>
    )
  }
  render(){
    let {isExpand} = this.props;
    return(
      <div className={`PlusToggler ${this.props.className}`}>
        {isExpand ? this.renderTrue() : this.renderFalse()}
      </div>
    );
  }
}

export default PlusToggler;
