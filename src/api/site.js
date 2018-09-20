import instance from './index';
import Qs from 'qs';

const preUrlPath = '';

//查询列表
const list = {
  p: ['get,/users'],//暂时没用留作权限控制使用
  r: params => {
    return instance.get(preUrlPath + '/users', {params})
  }
};


export {
  list,
}
