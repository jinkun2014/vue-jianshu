import Vue from 'vue'
import {Message} from 'element-ui'

Vue.component(Message.name, Message);


//localStorage
export const local = function (key, value) {
  if (value === void(0)) {
    var lsVal = localStorage.getItem(key);
    if (lsVal && lsVal.indexOf('autostringify-') === 0) {
      return JSON.parse(lsVal.split('autostringify-')[1]);
    } else {
      return lsVal;
    }
  } else {
    if (typeof(value) === "object" || Array.isArray(value)) {
      value = 'autostringify-' + JSON.stringify(value);
    }
    return localStorage.setItem(key, value);
  }
}

//sessionStorage
export const session = function (key, value) {
  if (value === void(0)) {
    var lsVal = sessionStorage.getItem(key);
    if (lsVal && lsVal.indexOf('autostringify-') === 0) {
      return JSON.parse(lsVal.split('autostringify-')[1]);
    } else {
      return lsVal;
    }
  } else {
    if (typeof(value) === "object" || Array.isArray(value)) {
      value = 'autostringify-' + JSON.stringify(value);
    }
    return sessionStorage.setItem(key, value);
  }
}

//生成随机数
export const getUUID = function (len) {
  len = len || 6;
  len = parseInt(len, 10);
  len = isNaN(len) ? 6 : len;
  var seed = "0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ";
  var seedLen = seed.length - 1;
  var uuid = "";
  while (len--) {
    uuid += seed[Math.round(Math.random() * seedLen)];
  }
  return uuid;
};
//深拷贝
export const deepcopy = function (source) {
  if (!source) {
    return source;
  }
  let sourceCopy = source instanceof Array ? [] : {};
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item];
  }
  return sourceCopy;
};

//菜单数据组织
export const buildMenu = function (array, ckey) {
  let menuData = [];
  let indexKeys = Array.isArray(array) ? array.map((e) => {
    return e.id
  }) : [];
  ckey = ckey || 'parent_id';
  array.forEach(function (e, i) {
    //一级菜单
    if (!e[ckey] || (e[ckey] === e.id)) {
      delete e[ckey];
      menuData.push(deepcopy(e)); //深拷贝
    } else if (Array.isArray(indexKeys)) {
      //检测ckey有效性
      let parentIndex = indexKeys.findIndex(function (id) {
        return id == e[ckey];
      });
      if (parentIndex === -1) {
        menuData.push(e);
      }
    }
  });
  let findChildren = function (parentArr) {
    if (Array.isArray(parentArr) && parentArr.length) {
      parentArr.forEach(function (parentNode) {
        array.forEach(function (node) {
          if (parentNode.id === node[ckey]) {
            if (parentNode.children) {
              parentNode.children.push(node);
            } else {
              parentNode.children = [node];
            }
          }
        });
        if (parentNode.children) {
          findChildren(parentNode.children);
        }
      });
    }
  };
  findChildren(menuData);
  return menuData;
}
//日期格式化
export const dateFormat = function (source, ignore_minute) {
  var myDate;
  var separate = '-';
  var minute = '';
  if (source === void(0)) {
    source = new Date();
  }
  if (source) {
    if (source.split) {
      source = source.replace(/\-/g, '/');
    } else if (isNaN(parseInt(source))) {
      source = source.toString().replace(/\-/g, '/');
    } else {
      source = new Date(source);
    }

    if (new Date(source) && (new Date(source)).getDate) {
      myDate = new Date(source);
      if (!ignore_minute) {
        minute = (myDate.getHours() < 10 ? " 0" : " ") + myDate.getHours() + ":" + (myDate.getMinutes() < 10 ? "0" : "") + myDate.getMinutes();
      }
      return myDate.getFullYear() + separate + (myDate.getMonth() + 1) + separate + (myDate.getDate() < 10 ? '0' : '') + myDate.getDate() + minute;
    } else {
      return source.slice(0, 16);
    }
  } else {
    return source
  }
};
//ajax错误处理
export const catchError = function (error) {
  switch (error.resultCode) {
    case "60000":
      sessionStorage.clear();
      Vue.prototype.$alert("未登录或登录超时", '提示', {
        confirmButtonText: '重新登录',
        callback: action => {
          //跳转到登录页
          location.reload();
        }
      });
      break;
    default:
      Vue.prototype.$message({
        message: error.message || '请求异常',
        type: 'error'
      });
      break;
  }
  return Promise.reject(error);
};
