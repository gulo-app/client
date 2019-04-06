import React, {Component} from 'react';
import './style.scss';
import {connect}            from 'react-redux';
import {bindActionCreators} from 'redux';
import {logout}             from '../../../actions/user';
import MenuToggler          from '../../Misc/MenuToggler';


class SideMenu extends Component{
  render(){
    let {isMenu} = this.props;
    //if(!isMenu) return null;

    return(
      <div className={`SideMenu ${!isMenu && 'hidden'}`}>
        <div className='overlay'></div>
        <main>
          <div><MenuToggler /></div>
          <div><button onClick={() => this.props.logout()}>LogOut</button></div>
          <div>3</div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({user, isMenu}) => {return {user, isMenu} };

function mapDispatchToProps(dispatch){
  return bindActionCreators({logout}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
