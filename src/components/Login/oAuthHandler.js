import {Plugins}                            from '@capacitor/core';
import { GooglePlus }                       from '@ionic-native/google-plus';
import { Facebook }                         from '@ionic-native/facebook';
import { API_CALL }                         from '../../consts';
import Storage                              from '../../plugins/Storage';
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
                return {idToken, provider: 'firebase'};
              })
            }).catch((e) => console.log(e.message));

        case 'android':
        case 'ios':
            let {idToken} = await GooglePlus.login({'webClientId': '180978526897-pa56t6sljm8hb1td5be3o2jdhopqbdj4.apps.googleusercontent.com'});
            return {idToken, provider: 'google'};
        default:
          return null;
      }
    },
    facebook: async(firebase) => {
      const {platform} = await Device.getInfo();
      switch(platform){
        case 'web':
            const facebookProvider = new firebase.auth.FacebookAuthProvider();
            return firebase.auth().signInWithPopup(facebookProvider).then((user) => {
              return firebase.auth().currentUser.getIdToken(true).then((idToken) => {
                return {idToken, provider: 'firebase'};
              })
            }).catch((e) => {
              if(e.code==='auth/account-exists-with-different-credential')
                alert('מייל זה כבר משוייך להתחברות מגוגל. \nיש להתחבר באמצעות גוגל');
                return {};
            });

        case 'android':
        case 'ios':
            const res =   await   Facebook.login(['public_profile','email']);
            if(!res)
              return null;
            return {idToken: res.authResponse.accessToken, provider: 'facebook'}
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
    const {platform} = await Device.getInfo();

    if(firebase && firebase.auth().currentUser) //for web client
      await firebase.auth().signOut();

    if(platform==='ios' || platform==='android'){
      GooglePlus.logout();
      GooglePlus.disconnect();
    }


    await Storage.clear();
    console.log(`logout`);
  }
}

export default oAuthHandler;
