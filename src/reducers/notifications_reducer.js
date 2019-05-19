import {FETCH_NOTIFICATIONS, MARK_UNNEW, MARK_READ, CONFIRM_NOTIFICATION, INSERT_NOTIFICATION, DELETE_NOTIFICATION} from '../actions/notification';
import _ from 'lodash';

export default function(state=[], action){
  let mapNotis, updatedNotification, noti_id;
  switch(action.type){
    case FETCH_NOTIFICATIONS:
      if(action.error){
        console.log("fetch lists failed");
        return state;
      }
      //console.log('FETCH');
      mapNotis = _.keyBy(action.payload, 'notification_id'); //convert array to mapped object
      return mapNotis;

    case INSERT_NOTIFICATION:
      //console.log('INSERT');
      let newNotification = action.payload;
      return { ...state, [newNotification.notification_id]: newNotification };

    case DELETE_NOTIFICATION:
      //console.log('DELETE');
      noti_id = action.payload.notification_id;
      const {[noti_id]: value, ...notificationsAfterDelete } = state;
      return notificationsAfterDelete;

    case MARK_UNNEW:
      //console.log('MARK_UNNEW');
      mapNotis = _.keyBy(action.payload, 'notification_id'); //convert array to mapped object
      return mapNotis;

    case MARK_READ:
      //console.log('MARK_READ');
      noti_id = action.payload.notification_id;
      return { ...state, [noti_id]: {...state[noti_id], 'isRead': 1}};

    case CONFIRM_NOTIFICATION:
      console.log('CONFIRM_NOTIFICATION');
      updatedNotification = action.payload;
      return { ...state, [updatedNotification.notification_id]: updatedNotification };

    default:
      return state;
  }
}
