const axios = require('axios');

//const URI = "http://localhost:9001";
const URI = "https://gulo-service.herokuapp.com/";
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
  API_CALL
}
