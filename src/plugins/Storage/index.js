import {Plugins} from '@capacitor/core';
const {Device} = Plugins;

const Storage = {
  setItem: async (key, value) => {
    let {platform} = await Device.getInfo();
    let storage = (platform==='web') ? window.localStorage : Plugins.Storage;
    switch(platform){
      case 'web':
        await storage.setItem(key, value);
        break;

      case 'android':
      case 'ios':
        await storage.set({key, value});
        break;

      default:
    }
  },
  getItem: async (key) => {
    let {platform} = await Device.getInfo();
    let storage = (platform==='web') ? window.localStorage : Plugins.Storage;

    switch(platform){
      case 'web':
        return await storage.getItem(key);

      case 'android':
      case 'ios':
        let ret = await storage.get({key});
        return ret.value;

      default:
    }
  },
  removeItem: async (key) => {
    let {platform} = await Device.getInfo();
    let storage = (platform==='web') ? window.localStorage : Plugins.Storage;
    switch(platform){
      case 'web':
        await storage.removeItem(key);
        return;

      case 'android':
      case 'ios':
        await storage.remove({key});
        return;

      default:
    }
  },
  clear: async () => {
    await Storage.removeItem('mail');
    await Storage.removeItem('authToken');
  }
}

export default Storage;
