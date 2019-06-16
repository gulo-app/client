import {API_CALL} from '../../consts';

export const FETCH_NOTIFICATIONS    =   'FETCH_NOTIFICATIONS';
export const MARK_UNNEW             =   'MARK_UNNEW';
export const MARK_READ              =   'MARK_READ';
export const CONFIRM_NOTIFICATION   =   'CONFIRM_NOTIFICATION';
export const INSERT_NOTIFICATION    =   'INSERT_NOTIFICATION';
export const DELETE_NOTIFICATION    =   'DELETE_NOTIFICATION';
export const UPDATE_NOTIFICATION    =   'UPDATE_NOTIFICATION';
export const UPDATE_FIREBASE_NOTIFICATION_TOKEN = 'UPDATE_FIREBASE_NOTIFICATION_TOKEN';

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
  return {
    type: INSERT_NOTIFICATION,
    payload: notification
  }
}

export function deleteNotification(notification_id){
  const req = API_CALL('DELETE', `/notification/${notification_id}`);
  return {
    type: DELETE_NOTIFICATION,
    payload: req
  }
}

export function updateNotification(notification){
  return {
    type: UPDATE_NOTIFICATION,
    payload: notification
  }
}

export function updateFirebaseNotificationToken(token){
  const req = API_CALL('POST', `/notification/updateFirebaseNotificationToken`, {token});
  return {
    type: UPDATE_FIREBASE_NOTIFICATION_TOKEN,
    payload: req
  }
}
