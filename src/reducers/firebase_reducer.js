import {SET_FIREBASE} from '../actions/firebase';

export default function(state=null, action){
  switch(action.type){
    case SET_FIREBASE:
      return action.payload;

    default:
      return state;
  }
}
