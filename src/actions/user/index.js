import {API_CALL} from '../../consts';

export const FIREBASE_LOGIN   =   'FIREBASE_LOGIN';
export const AUTO_LOGIN       =   'AUTO_LOGIN';
export const VERIFY_AUTH      =   'VERIFY_AUTH';
export const SET_USER         =   'SET_USER';
export const LOGOUT           =   'LOGOUT';

export function firebaseLogin(user){
  const req = API_CALL('POST', '/user/login/firebase', user);

  return{
    type: FIREBASE_LOGIN,
    payload: req
  };
}

export function autoLogin(email){
  const req = API_CALL('POST', '/user/login/auto-login', {email});

  return{
    type: AUTO_LOGIN,
    payload: req
  };
}

export function verifyAuth(){
  const user = API_CALL('POST', '/user/login/auth-test');
  return{
    type: VERIFY_AUTH,
    payload: user
  };
}
export function setUser(user){
  return{
    type: SET_USER,
    payload: user
  };
}

export async function logout(){  
  const req = API_CALL('POST', '/user/logout');
  return{
    type: LOGOUT,
    payload: req
  };
}
