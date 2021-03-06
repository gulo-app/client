const axios = require('axios');

let URI;
if(process.env.NODE_ENV==='production')
  URI = "https://montv10.net:9400";  // URI = "http://10.0.2.2:9400";
if(window.location.hostname.includes('montv10.net'))
  URI = "https://montv10.net:9400";

if(!URI)
  URI = "http://localhost:9400";

console.log(`service-url: ${URI}`);

const API_CALL = (verb, path, data) => {
  return new Promise((resolve, reject) => {
    let url = `${URI}${path}`;
    //console.log(`API_CALL: ${url}`);

    axios(url, {
      method: verb,
      withCredentials: true,
      data
    }).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      //console.log(`API_CALL ERROR`);
      //console.log(err);
      reject(err);
    })
  });
}

module.exports = {
  API_CALL,
  URI
}
