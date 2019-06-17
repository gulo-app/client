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
        await Storage.set({key, value});
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
        return await storage.getItem({key});

      default:
    }
  }
}

export default Storage;
