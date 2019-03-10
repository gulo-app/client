import {GOOGLE_LOGIN, LOGOUT} from '../actions/index';

export default function(state=null, action){
  switch(action.type){
    case GOOGLE_LOGIN:
      return action.payload;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}
