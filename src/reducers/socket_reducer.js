import {SUBSCRIBE_SOCKET} from '../actions/socket';
import {LOGOUT} from '../actions/user/index';

export default function(state=null, action){
  switch(action.type){
    case SUBSCRIBE_SOCKET:      
      return action.payload;
    case LOGOUT:
      if(state)
        state.disconnect(); //disconnect socket
      return null;
    default:
      return state;
  }
}
