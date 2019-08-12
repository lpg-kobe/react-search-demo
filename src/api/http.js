/**
 * @desc request from axios
 * @author pika
 */

import axios from 'axios';

const request = axios.create({
  timeout: 5000,
  method: 'get'
});
request.interceptors.request.use(
  config => {
    // doSomething when send request
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
request.interceptors.response.use(
  res => {
    // doSomething when get result
    return res;
  },
  err => {
    return Promise.reject(err);
  }
);
export default request;
