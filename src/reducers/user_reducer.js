import {FIREBASE_LOGIN, AUTO_LOGIN, VERIFY_AUTH, SET_USER, LOGOUT} from '../actions/user/index';

export default function(state=null, action){
  switch(action.type){
    case VERIFY_AUTH:
    case SET_USER:
    case AUTO_LOGIN:
    case FIREBASE_LOGIN:
      if(action.error){
        console.log("login failed");
        return null;
      }
      return action.payload;
    case LOGOUT:
      console.log('logout');
      return null;
    default:
      return state;
  }
}
