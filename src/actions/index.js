import {API_CALL} from '../consts';

export const GOOGLE_LOGIN =   'GOOGLE_LOGIN';
export const LOGOUT       =   'LOGOUT';

export function googleLogin(user){
  const req = API_CALL('POST', '/user/login/google', user);

  return{
    type: GOOGLE_LOGIN,
    payload: req
  };
}

export function logout(){
  const req = API_CALL('POST', '/user/logout');

  return{
    type: LOGOUT,
    payload: req
  };
}
