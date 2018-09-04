import instance from './index';
import Qs from 'qs';

//以表单的方式登录
const login = (params) => {
  return instance.post("/admin/login", Qs.stringify(params), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
};

//退出登录
const logout = () => {
  return instance.get("/admin/logout");
};

export {
  login,
  logout
}
