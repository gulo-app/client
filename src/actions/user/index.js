import {API_CALL} from '../../consts';

export const GOOGLE_LOGIN     =   'GOOGLE_LOGIN';
export const FACEBOOK_LOGIN   =   'FACEBOOK_LOGIN';
export const VERIFY_AUTH      =   'VERIFY_AUTH';
export const SET_USER         =   'SET_USER';
export const LOGOUT           =   'LOGOUT';

export function googleLogin(user){
  const req = API_CALL('POST', '/user/login/google', user);

  return{
    type: GOOGLE_LOGIN,
    payload: req
  };
}
export function facebookLogin(user){
  const req = API_CALL('POST', '/user/login/facebook', user);
  return{
    type: FACEBOOK_LOGIN,
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

export function logout(){
  console.log('logout');
  const req = API_CALL('POST', '/user/logout');

  return{
    type: LOGOUT,
    payload: req
  };
}
