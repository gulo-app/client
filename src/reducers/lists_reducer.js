import {FETCH_LISTS, INSERT_LIST} from '../actions/list';

export default function(state=[], action){
  switch(action.type){
    case FETCH_LISTS:
      if(action.error){
        console.log("fetch lists failed");
        return state;
      }
      return action.payload;
    case INSERT_LIST:
      return [...state, action.payload];
    default:
      return state;
  }
}
