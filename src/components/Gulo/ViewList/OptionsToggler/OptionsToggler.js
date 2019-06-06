import React,{Component}  from 'react';
import './style.scss';
import Icon               from '../../../Misc/Icon';

class OptionsToggler extends Component{
  constructor(props){
    super(props);
    this.state = {isExpand: false}

    this.toggleExpand = this.toggleExpand.bind(this);
  }
  toggleExpand(){
    let isExpand = !(this.state.isExpand);
    this.setState({isExpand});
  }
  renderFalse(){
    return(
      <div className='false'>
        <div><button className='expand' onClick={this.toggleExpand}><Icon icon="plus" /></button></div>
      </div>
    );
  }

  renderTrue(){
    return (
      <div className='true'>
        <div className='expand'><button className='expand' onClick={this.toggleExpand}><Icon icon="times" /></button></div>
        <div className='option'>
          <div className='icon'><Icon icon='plus' /></div>
          <div className='desc'>הוספה ידנית</div>
        </div>
        <div className='option' onClick={this.props.shareWhatsapp}>
          <div className='desc'>שיתוף רשימה</div>
          <div className='icon'><Icon icon='whatsapp' faType='fab' /></div>
        </div>
      </div>
    )
  }
  render(){
    let {isExpand} = this.state;
    return(
      <div className='OptionsToggler'>
        {isExpand ? this.renderTrue() : this.renderFalse()}
      </div>
    );
  }
}

export default OptionsToggler;
