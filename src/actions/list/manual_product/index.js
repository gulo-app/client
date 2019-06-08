//import {API_CALL} from '../../consts';

export const UPDATE_LIST_MANUAL_PRODUCT   =      'UPDATE_LIST_MANUAL_PRODUCT';
export const DELETE_LIST_MANUAL_PRODUCT   =      'DELETE_LIST_MANUAL_PRODUCT';

export function updateListManualProduct(product){
  return{
    type: UPDATE_LIST_MANUAL_PRODUCT,
    payload: product
  };
}

export function deleteListManualProduct(list_id, product_id){
  return {
    type: DELETE_LIST_MANUAL_PRODUCT,
    payload: {list_id, product_id}
  }
}
