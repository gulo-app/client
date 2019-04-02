const axios = require('axios');

const URI = window.location.hostname.includes('heroku') ? "https://montv10.net:9400" : "http://localhost:9400"; //https://gulo-service.herokuapp.com
console.log(`service-url: ${URI}`);

const API_CALL = (verb, path, data) => {
  return new Promise((resolve, reject) => {
    let url = `${URI}${path}`;
    console.log(url);

    axios(`${URI}${path}`, {
      method: verb,
      withCredentials: true,
      data
    }).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    })
  });
}

module.exports = {
  API_CALL,
  URI
}
