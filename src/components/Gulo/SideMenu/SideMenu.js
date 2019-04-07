import React, {Component} from 'react';
import './style.scss';
import {connect}            from 'react-redux';
import {logout}             from '../../../actions/user';
import {toggleMenu}         from '../../../actions/UI';
import MenuToggler          from '../../Misc/MenuToggler';
import Icon                 from '../../Misc/Icon';


class SideMenu extends Component{
  render(){
    let {isMenu, user} = this.props;
    //if(!isMenu) return null;

    return(
      <div className={`SideMenu ${!isMenu && 'hidden'}`}>
        <div className='overlay' onClick={() => this.props.toggleMenu()}></div>
        <main>
          <div className='toggler'><MenuToggler /></div>
          {/*<div><button onClick={() => this.props.logout()}>LogOut</button></div>*/}
          <div className='profile'>
            <div className='pic'>
              <img src={user.pic} alt='' />
            </div>
            <div className='username'>
              {user.firstname} {user.lastname}
            </div>
            <div className='hr' />
          </div>
          <menu className={`${!isMenu && 'hidden'}`}>
            <div className='row'>
              <div className='icon' style={{marginRight:'+3px'}}><Icon icon='clipboard-list' /></div>
              <div className='title'>הרשימות שלי</div>
            </div>
            <div className='row'>
              <div className='icon'><Icon faType='far' icon='comment' /></div>
              <div className='title'>התראות</div>
            </div>
            <div className='row' onClick={() => this.props.logout()}>
              <div className='icon'><Icon icon='power-off' /></div>
              <div className='title'>התנתקות</div>
            </div>
          </menu>
          <footer>
            <div>Gulo</div>
          </footer>
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({user, isMenu}) => {return {user, isMenu} };

export default connect(mapStateToProps, {logout, toggleMenu})(SideMenu);
