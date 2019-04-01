import {API_CALL} from '../../consts';

export const FETCH_LISTS      =   'FETCH_LISTS';
export const INSERT_LIST      =   'INSERT_LIST';

export function fetchLists(){
  const req = API_CALL('GET', '/list');
  return{
    type: FETCH_LISTS,
    payload: req
  };
}

export function insertList(list){
  return {
    type: INSERT_LIST,
    payload: list
  }
}
