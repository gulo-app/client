import React, {Component} from 'react';
import './style.scss';
import _ from 'lodash';
import {withRouter}         from 'react-router-dom';
import {connect}            from 'react-redux';
import {logout}             from '../../../actions/user';
import {toggleMenu}         from '../../../actions/UI';
import MenuToggler          from '../../Misc/MenuToggler';
import Icon                 from '../../Misc/Icon';

class SideMenu extends Component{
  constructor(props){
    super(props);
    this.link = this.link.bind(this);
  }
  link(to){
    this.props.history.push(to);
    this.props.toggleMenu();
  }
  render(){
    let {isMenu, user, notifications} = this.props;
    //const newCounter    = _.filter(notifications, (noti) => noti.isNew===1).length;
    let unReadCounter = _.filter(notifications, (noti) => noti.isRead===0).length;
    
    //if(!isMenu) return null;
    return(
      <div className={`SideMenu ${!isMenu && 'hidden'}`}>
        <div className='overlay' onClick={() => this.props.toggleMenu()}></div>
        <main>
          <div className='toggler'><MenuToggler /></div>
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

            <div className='row'  onClick={() => this.link('/lists')}>
              <div className='icon' style={{marginRight:'+3px'}}><Icon icon='clipboard-list' /></div>
              <div className='title'>הרשימות שלי</div>
            </div>
            <div className='row' onClick={() => this.link('/notifications')}>
              <div className='icon notifications'>
                  {/*<span className='counter'>{unReadCounter}</span>*/}
                  {unReadCounter>0 &&<div className='badger'>
                    {unReadCounter}
                  </div>}
                  <Icon faType='far' icon='bell' />
              </div>
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

const mapStateToProps = ({user, isMenu, notifications}) => {return {user, isMenu, notifications} };

export default withRouter(connect(mapStateToProps, {logout, toggleMenu})(SideMenu));
