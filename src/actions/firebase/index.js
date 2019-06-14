export const SET_FIREBASE     =   'SET_FIREBASE';

export function setFirebase(firebase){
  return{
    type: SET_FIREBASE,
    payload: firebase
  };
}
