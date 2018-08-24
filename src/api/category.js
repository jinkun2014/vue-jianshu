import instance from './index';
import Qs from 'qs';

const preUrlPath = '/blog/category';

//新增
const save = {
  p: ['post,' + preUrlPath + '/save'],//暂时没用留作权限控制使用
  r: (params) => {
    return instance.post(preUrlPath + '/save', Qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }
}

//更新
const update = {
  p: ['put,' + preUrlPath + '/{id}'],//暂时没用留作权限控制使用
  r: (id, params) => {
    return instance.put(preUrlPath + '/' + id, Qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }
}

//删除
const del = {
  p: ['delete,' + preUrlPath + '/{id}/delete'],//暂时没用留作权限控制使用
  r: (id) => {
    return instance.delete(preUrlPath + '/' + id + '/delete');
  }
}

//查询列表
const list = {
  p: ['get,' + preUrlPath + '/list'],//暂时没用留作权限控制使用
  r: (params) => {
    return instance.get(preUrlPath + '/list', {params})
  }
}

//查询
const get = {
  p: ['get,' + preUrlPath + '/{id}'],//暂时没用留作权限控制使用
  r: (id) => {
    return instance.get(preUrlPath + '/' + id)
  }
}

//更新
const seq = {
  p: ['post,' + preUrlPath + '/seq'],//暂时没用留作权限控制使用
  r: (params) => {
    return instance.post(preUrlPath + '/seq', params);
  }
}

export {
  save,
  update,
  del,
  list,
  get,
  seq
}
