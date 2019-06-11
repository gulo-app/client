const axios = require('axios');

const URI = window.location.hostname.includes('heroku') || window.location.hostname.includes('montv10.net') ?
                "https://montv10.net:9400" : "http://localhost:9400"; //https://gulo-service.herokuapp.com
// const URI = "https://montv10.net:9400";
console.log(`service-url: ${URI}`);

const API_CALL = (verb, path, data) => {
  return new Promise((resolve, reject) => {
    let url = `${URI}${path}`;
    console.log(`API_CALL: ${url}`);

    axios(`${URI}${path}`, {
      method: verb,
      withCredentials: true,
      data
    }).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      console.log(`API_CALL ERROR`);
      console.log(err);
      reject(err);
    })
  });
}

module.exports = {
  API_CALL,
  URI
}
