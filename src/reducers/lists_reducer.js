import {FETCH_LISTS, INSERT_LIST, UPDATE_LIST, DELETE_LIST}               from '../actions/list';
import {UPDATE_LIST_PRODUCT, DELETE_LIST_PRODUCT}                         from '../actions/list/product';
import {UPDATE_LIST_MANUAL_PRODUCT, DELETE_LIST_MANUAL_PRODUCT}           from '../actions/list/manual_product';
import _ from 'lodash';

export default function(state={}, action){
  let newState, product;

  switch(action.type){
    case FETCH_LISTS:
      if(action.error){
        console.log("fetch lists failed");
        return state;
      }

      let mapLists = _.keyBy(action.payload, 'list_id'); //convert array to mapped object
      _.forOwn(mapLists, (val,key) => {
        val.products        =   _.keyBy(val.products, 'id') //map products array to mapped object
        val.manual_products =   _.keyBy(val.manual_products, 'id') //map products array to mapped object
      })
      console.log(mapLists);
      return mapLists;

    case INSERT_LIST:
      let newList = action.payload;
      return { ...state, [newList.list_id]: newList };

    case UPDATE_LIST:
      let updatedList = action.payload;
      return { ...state, [updatedList.list_id]: updatedList };

    case DELETE_LIST:
      let list_id = action.payload;
      const {[list_id]: value, ...listsAfterDelete } = state;
      return listsAfterDelete;

    case UPDATE_LIST_PRODUCT:
      product = action.payload;
      return {...state, [product.list_id]: {...state[product.list_id], 'products': {...state[product.list_id]['products'], [product.id]:  product}}};

    case UPDATE_LIST_MANUAL_PRODUCT:
      product = action.payload;
      return {...state, [product.list_id]: {...state[product.list_id], 'manual_products': {...state[product.list_id]['manual_products'], [product.id]:  product}}};

    case DELETE_LIST_PRODUCT:
      newState = _.cloneDeep(state);
      delete newState[action.payload.list_id].products[action.payload.product_id];
      return newState;

    case DELETE_LIST_MANUAL_PRODUCT:
      newState = _.cloneDeep(state);
      delete newState[action.payload.list_id].manual_products[action.payload.product_id];
      return newState;

    default:
      return state;
  }
}
