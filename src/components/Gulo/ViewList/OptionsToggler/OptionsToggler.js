import React,{Component}  from 'react';
import './style.scss';
import Icon               from '../../../Misc/Icon';

class OptionsToggler extends Component{
  renderFalse(){
    return(
      <div className='false'>
        <div><button className='expand' onClick={this.props.toggle}><Icon icon="ellipsis-v" /></button></div>
      </div>
    );
  }

  renderTrue(){
    const {isCreator, platform, shoppingMode} = this.props;
    return (
      <div className='true'>
        <div className='expand'><button className='expand' onClick={this.props.toggle}><Icon icon="times" /></button></div>
        {isCreator &&
          <div className='option' onClick={() => {this.props.toggle(); this.props.clearList();}}>
            <div className='icon'><Icon icon='broom' /></div>
            <div className='desc'>ניקוי רשימה</div>
          </div>
        }
        <div className='option' onClick={() => {this.props.toggle(); this.props.bestShoppingCart();}}>
          <div className='desc'>סל הקניות הזול ביותר</div>
          <div className='icon'><Icon icon='shopping-cart' /></div>
        </div>
        <div className='option' onClick={() => {this.props.toggle(); this.props.shareWhatsapp();}}>
          <div className='desc'>שיתוף רשימה</div>
          <div className='icon'><Icon icon='whatsapp' faType='fab' /></div>
        </div>
        {(platform==='ios' || platform==='android') &&
          <div className='option shopping-mode' onClick={() => {this.props.toggleShoppingMode();}}>
            <div className='desc'>מצב סופרמרקט</div>
            <div className='icon'><Icon icon={!shoppingMode ? 'toggle-off' : 'toggle-on'}/></div>
          </div>
        }
      </div>
    )
  }
  render(){
    let {isExpand} = this.props;
    return(
      <div className={`OptionsToggler ${this.props.className}`}>
        {isExpand ? this.renderTrue() : this.renderFalse()}
      </div>
    );
  }
}

export default OptionsToggler;
