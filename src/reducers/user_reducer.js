import {FACEBOOK_LOGIN, GOOGLE_LOGIN, LOGOUT} from '../actions/index';

export default function(state=null, action){
  switch(action.type){
    case GOOGLE_LOGIN:
    case FACEBOOK_LOGIN:
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
