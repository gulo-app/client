import {FETCH_LISTS, INSERT_LIST} from '../actions/list';
import {UPDATE_LIST_PRODUCT}   from '../actions/list/product';
import _ from 'lodash';

export default function(state={}, action){
  switch(action.type){
    case FETCH_LISTS:
      if(action.error){
        console.log("fetch lists failed");
        return state;
      }
      let mapLists = _.keyBy(action.payload, 'list_id'); //convert array to mapped object
      _.forOwn(mapLists, (val,key) => {
        val.products = _.keyBy(val.products, 'id') //map products array to mapped object
      })
      return mapLists;

    case INSERT_LIST:
      let newList = action.payload;
      return { ...state, [newList.list_id]: action.payload };

    case UPDATE_LIST_PRODUCT:
      let product = action.payload;
      return {...state, [product.list_id]: {...state[product.list_id], 'products': {...state[product.list_id]['products'], [product.id]:  product}}};

    default:
      return state;
  }
}
