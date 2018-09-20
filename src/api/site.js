import instance from './index';

const preUrlPath = '/blog/site';

//查询列表
const get = {
  p: ['get,/{id}/user'],//暂时没用留作权限控制使用
  r: (id, params) => {
    return instance.get(preUrlPath + '/' + id + '/user', {params})
  }
};

export {
  get,
}
