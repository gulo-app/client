import {FETCH_NOTIFICATIONS, MARK_UNNEW, MARK_READ, CONFIRM_NOTIFICATION, INSERT_NOTIFICATION} from '../actions/notification';
import _ from 'lodash';

export default function(state=[], action){
  let mapNotis, updatedNotification, noti_id;

  switch(action.type){
    case FETCH_NOTIFICATIONS:
      if(action.error){
        console.log("fetch lists failed");
        return state;
      }
      mapNotis = _.keyBy(action.payload, 'notification_id'); //convert array to mapped object
      return mapNotis;

    case INSERT_NOTIFICATION:
      let newNotification = action.payload;
      return { ...state, [newNotification.notification_id]: newNotification };

    case MARK_UNNEW:
      mapNotis = _.keyBy(action.payload, 'notification_id'); //convert array to mapped object
      return mapNotis;

    case MARK_READ:
      noti_id = action.payload.notification_id;
      return { ...state, [noti_id]: {...state[noti_id], 'isRead': 1}};

    case CONFIRM_NOTIFICATION:
      updatedNotification = action.payload;
      return { ...state, [updatedNotification.notification_id]: updatedNotification };

    default:
      return state;
  }
}
