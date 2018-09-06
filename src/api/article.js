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

//查询内容
const content = {
  p: ['get,' + preUrlPath + '/{id}/content'],//暂时没用留作权限控制使用
  r: (id) => {
    return instance.get(preUrlPath + '/' + id + "/content")
  }
}

//更新
const seq = {
  p: ['post,' + preUrlPath + '/seq'],//暂时没用留作权限控制使用
  r: (params) => {
    return instance.post(preUrlPath + '/seq', params);
  }
}

//发布状态
const publish = {
  p: ['put,' + preUrlPath + '/{id}/publish/{status}'],//暂时没用留作权限控制使用
  r: (id, status, params) => {
    return instance.put(preUrlPath + '/' + id + '/publish/' + status, Qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }
}

//评论状态
const comment = {
  p: ['put,' + preUrlPath + '/{id}/comment/{status}'],//暂时没用留作权限控制使用
  r: (id, status, params) => {
    return instance.put(preUrlPath + '/' + id + '/comment/' + status, Qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }
}

//上传图片
const imgUpload = {
  p: ['post,' + '/blog/attachment/{id}/upload'],//暂时没用留作权限控制使用
  r: (id, params) => {
    return instance.post('/blog/attachment/' + id + '/upload', params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
  }
};

//查询历史
const historyList = {
  p: ['get,' + preUrlPath + '/{id}/content/list'],//暂时没用留作权限控制使用
  r: (id, params) => {
    return instance.get(preUrlPath + '/' + id + '/content/list', {params})
  }
}

//恢复版本
const revert = {
  p: ['put,' + preUrlPath + '/{id}/revert'],//暂时没用留作权限控制使用
  r: (id, params) => {
    return instance.put(preUrlPath + '/' + id + '/revert', Qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }
}

export {
  save,
  update,
  del,
  list,
  get,
  content,
  seq,
  publish,
  comment,
  imgUpload,
  historyList,
  revert
}
