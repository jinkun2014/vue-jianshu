import axios from 'axios';
import * as util from '../assets/util.js';

// onLine
// const instance = axios.create({
//   baseURL: '',
//   timeout: 10000
// });

//local
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8085',
  timeout: 10000
});

//设置请求头
instance.defaults.headers = {
  'Content-Type': 'application/json'
};

//错误处理
/*
==========
{
  "resultCode":"00000",
  "message":"请求成功",
  "data":{},
}
==========
*/
instance.interceptors.response.use(
  resp => {
    let data = resp.data;
    if (data.resultCode && data.resultCode == "00000") {
      //成功就直接返回数据
      return data.data;
    }

    //登录成功后的其它异常
    let err = new Error();
    err.data = data.data;
    err.message = data.message;
    err.resultCode = data.resultCode;
    throw err;

    return resp;
  },
  err => {
    //这里是返回状态码不为200时候的错误处理
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误';
          break;
        case 401:
          err.message = '未授权，请登录';
          break;
        case 403:
          err.message = '拒绝访问';
          break;
        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`;
          break;
        case 408:
          err.message = '请求超时';
          break;
        case 500:
          err.message = '服务器内部错误';
          break;
        case 501:
          err.message = '服务未实现';
          break;
        case 502:
          err.message = '网关错误';
          break;
        case 503:
          err.message = '服务不可用';
          break;
        case 504:
          err.message = '网关超时';
          break;
        case 505:
          err.message = 'HTTP版本不受支持';
          break;
        default:
          err.message = '请求异常';
      }
    }

    //请求错误
    if (err && err.message) {
      // 网络错误
      if (err.message.indexOf('Network Error') != -1) {
        err.message = "网络错误";
      }
      //请求超时
      if (err.message.indexOf('timeout') != -1) {
        err.message = "请求超时";
      }
    }
    return Promise.reject(err);
  });

export default instance;
