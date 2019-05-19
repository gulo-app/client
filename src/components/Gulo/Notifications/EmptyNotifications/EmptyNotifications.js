import React from 'react';
import './style.scss';
import Icon from '../../../Misc/Icon';

const EmptyNotifications = () => {
  return(
    <div className='EmptyNotifications'>
      <div className="icon"><Icon icon="file" faType="far"/></div>
      <div className='primary'>רשימת ההתראות ריקה</div>      
    </div>
  );
}

export default EmptyNotifications;
