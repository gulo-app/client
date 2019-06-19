import React from 'react';
import './style.scss';
import moment from 'moment';

const getDateStr = (modifiedAt) => {
  let dateDiff = moment().startOf('day').diff(moment(modifiedAt).startOf('day'), 'days');
  if(dateDiff===0)
    return 'היום'
  else if(dateDiff===1)
    return 'אתמול';

  if(moment(modifiedAt).year() === moment().year())
    return 'בתאריך ' + moment(modifiedAt).format('DD/MM');
  else
    return 'בתאריך ' + moment(modifiedAt).format('DD/MM/YY');
}

const ModifiedAt = ({modifiedAt}) => {  
  let dateStr = getDateStr(modifiedAt);
  let timeStr = moment(modifiedAt).format('HH:mm');
  return (
    <div className='ModifiedAt'>
      נערך לאחרונה
      <div className='date'>
        {dateStr}
        ,&nbsp;
        {timeStr}
      </div>
    </div>
  );
}

export default ModifiedAt;
