import {FACEBOOK_LOGIN, GOOGLE_LOGIN, VERIFY_AUTH, SET_USER, LOGOUT} from '../actions/user/index';

export default function(state=null, action){
  switch(action.type){
    case GOOGLE_LOGIN:
    case FACEBOOK_LOGIN:
    case VERIFY_AUTH:
    case SET_USER:
      if(action.error){
        console.log("login failed");
        return null;
      }
      return action.payload;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}
