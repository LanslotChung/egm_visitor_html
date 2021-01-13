import axios from "axios";

let http = axios.create({
  baseURL: "https://xiecong123.online/egm",
  // baseURL: 'http://192.168.3.7:8180/egm',
  withCredentials: false,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
  transformRequest: [
    function(data) {
      let newData = "";
      for (let k in data) {
        //Object.prototype.hasOwnProperty.call(obj, 'xxx')
        //if (data.hasOwnProperty(k) === true) {
        if (Object.prototype.hasOwnProperty.call(data, k) === true) {
          newData +=
            encodeURIComponent(k) + "=" + encodeURIComponent(data[k]) + "&";
        }
      }
      return newData;
    },
  ],
});

function apiAxios(method, url, params, response) {
  http({
    method: method,
    url: url,
    data: method === "POST" || method === "PUT" ? params : null,
    params: method === "GET" || method === "DELETE" ? params : null,
  })
    .then(function(res) {
      if (response) response(res);
    })
    .catch(function(err) {
      if (response) response(err);
    });
}

export default {
  get: function(url, params, response) {
    return apiAxios("GET", url, params, response);
  },
  post: function(url, params, response) {
    return apiAxios("POST", url, params, response);
  },
  put: function(url, params, response) {
    return apiAxios("PUT", url, params, response);
  },
  delete: function(url, params, response) {
    return apiAxios("DELETE", url, params, response);
  },
};
