//import {API_CALL} from '../../consts';

export const UPDATE_LIST_PRODUCT         =      'UPDATE_LIST_PRODCT';

export function updateListProduct(product){  
  return{
    type: UPDATE_LIST_PRODUCT,
    payload: product
  };
}
