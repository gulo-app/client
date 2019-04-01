import {TOGGLE_MENU} from '../actions/UI';
import {LOGOUT} from '../actions/user';

export default function(state=false, action){
  switch(action.type){
    case TOGGLE_MENU:
      return !(state);
    case LOGOUT:
      return false;
    default:
      return state;
  }
}
