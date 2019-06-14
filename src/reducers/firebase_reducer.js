import {SET_FIREBASE} from '../actions/firebase';

export default function(state=null, action){
  switch(action.type){
    case SET_FIREBASE:
      console.log('here comes the firebase');
      console.log(action.payload);
      return action.payload;

    default:
      return state;
  }
}
