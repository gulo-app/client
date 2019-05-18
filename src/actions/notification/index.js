import {API_CALL} from '../../consts';

export const FETCH_NOTIFICATIONS    =   'FETCH_NOTIFICATIONS';
export const MARK_UNNEW             =   'MARK_UNNEW';
export const MARK_READ              =   'MARK_READ';
export const CONFIRM_NOTIFICATION   =   'CONFIRM_NOTIFICATION';
export const INSERT_NOTIFICATION    =   'INSERT_NOTIFICATION';

export function fetchNotifications(){
  const req = API_CALL('GET', '/notification');
  return{
    type: FETCH_NOTIFICATIONS,
    payload: req
  };
}

export function markUnNew(){
  const req = API_CALL('POST', '/notification/unNew');
  return{
    type: MARK_UNNEW,
    payload: req
  };
}

export function markRead(notification_id){
  const req = API_CALL('POST', `/notification/${notification_id}/markRead`);
  return{
    type: MARK_READ,
    payload: req
  };
}

export function confirmNotification(notification_id){
  const req = API_CALL('POST', `/notification/${notification_id}/confirm`);
  return{
    type: CONFIRM_NOTIFICATION,
    payload: req
  };
}

export function insertNotification(notification){
  console.log(`Action insertNotification()`);
  return {
    type: INSERT_NOTIFICATION,
    payload: notification
  }
}
