//import {API_CALL} from '../../consts';

export const UPDATE_LIST_PRODUCT          =      'UPDATE_LIST_PRODUCT';
export const DELETE_LIST_PRODUCT          =      'DELETE_LIST_PRODUCT';

export function updateListProduct(product){
  return{
    type: UPDATE_LIST_PRODUCT,
    payload: product
  };
}

export function deleteListProduct(list_id, product_id){
  return {
    type: DELETE_LIST_PRODUCT,
    payload: {list_id, product_id}
  }
}
