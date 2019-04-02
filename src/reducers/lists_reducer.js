import {FETCH_LISTS, INSERT_LIST} from '../actions/list';
import _ from 'lodash';

export default function(state={}, action){
  switch(action.type){
    case FETCH_LISTS:
      if(action.error){
        console.log("fetch lists failed");
        return state;
      }
      let mapLists = _.keyBy(action.payload, 'list_id'); //convert array to mapped object      
      return mapLists;
    case INSERT_LIST:
      let newList = action.payload;
      //return {...state, newList.list_id: newList};
      console.log({ ...state, [newList.list_id]: action.payload });
      return { ...state, [newList.list_id]: action.payload };
    default:
      return state;
  }
}
