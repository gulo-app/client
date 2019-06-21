import {Plugins}                    from '@capacitor/core';
import { GooglePlus }               from '@ionic-native/google-plus';
import { API_CALL }                 from '../../consts';
import Storage                      from '../../plugins/Storage';
const {Device} = Plugins;

const oAuthHandler = { //firebase for web login
  login: {
    rememberUser: async (user) => {
      await Storage.setItem('authToken', user.authToken);
      await Storage.setItem('mail', user.mail);
    },
    google: async (firebase) => {
      const {platform} = await Device.getInfo();
      switch(platform){
        case 'web':
            const googleProvider = new firebase.auth.GoogleAuthProvider();
            return firebase.auth().signInWithPopup(googleProvider).then((user) => {
              return firebase.auth().currentUser.getIdToken(true).then((idToken) => {
                return {idToken};
              })
            }).catch((e) => console.log(e.message));

        case 'android':
        case 'ios':
            console.log(`login mobile`);
            let {idToken} = await GooglePlus.login({'webClientId': '180978526897-pa56t6sljm8hb1td5be3o2jdhopqbdj4.apps.googleusercontent.com'});
            return {idToken, isNative: true};
        default:
          return null;
      }
    }
  },
  verifyAuth: async (user) => {
    const mail        =   await Storage.getItem('mail');
    const authToken   =   await Storage.getItem('authToken');

    if(!authToken || !mail)
      return null;

    return API_CALL('POST', '/user/login/byAuthToken', {authToken, mail}).then((user) => {
      return user;
    }).catch((e) => {
      return null;
    });
  },
  logout: async (firebase) => {
    if(firebase && firebase.auth().currentUser) //for web client
      await firebase.auth().signOut();

    await Storage.clear();
    console.log(`logout`);
  }
}

export default oAuthHandler;
