import React from 'react';
import './style.scss';
import Icon from '../../../Misc/Icon';

const EmptyList = () => {
  return(
    <div className='EmptyList'>
      <div className="icon"><Icon icon="file" faType="far"/></div>
      <div className='primary'>אין לך רשימות עדיין</div>
      <div className='secondary'>לחץ על ה"+" כדי להתחיל</div>
    </div>
  );
}

export default EmptyList;
