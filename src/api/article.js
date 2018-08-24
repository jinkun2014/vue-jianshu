import instance from './index';
import Qs from 'qs';

const preUrlPath = '/blog/article';

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
  p: ['get,' + preUrlPath + '/category/{id}/list'],//暂时没用留作权限控制使用
  r: (categoryId, params) => {
    return instance.get(preUrlPath + '/category/' + categoryId + '/list', {params})
  }
}

//查询
const get = {
  p: ['get,' + preUrlPath + '/{id}'],//暂时没用留作权限控制使用
  r: (id) => {
    return instance.get(preUrlPath + '/' + id)
  }
}

export {
  save,
  update,
  del,
  list,
  get
}