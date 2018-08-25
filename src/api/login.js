import instance from './index';
import Qs from 'qs';

//以表单的方式登录
const requestLogin = params => {
  return instance.post("/admin/login", Qs.stringify(params), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
};

export {
  requestLogin,
}
