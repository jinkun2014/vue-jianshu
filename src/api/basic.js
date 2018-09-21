import instance from './index';

const preUrlPath = '/blog/user';
import Qs from 'qs';

//更新
const update = {
  p: ['put,' + preUrlPath + '/{id}/'],//暂时没用留作权限控制使用
  r: (id, params) => {
    return instance.put(preUrlPath + '/' + id, Qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }
}

export {
  update,
}
