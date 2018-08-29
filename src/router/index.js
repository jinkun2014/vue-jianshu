import Vue from 'vue'
import Router from 'vue-router'

import menus from './menus';

Vue.use(Router)

let baseRoute = [
  {
    path: '/login',
    name: '登录',
    component: (resolve) => require(['../views/login/login.vue'], resolve)
  },
  {
    path: '/404',
    name: '404',
    component: (resolve) => require(['../views/public/404.vue'], resolve)
  }
];

let router = new Router({
  routes: baseRoute
});

//动态增加路由
let allowRoutes = [
  {
    path: '/',
    name: '首页',
    meta: {
      name: '首页'
    },
    component: (resolve) => require(['../views/index.vue'], resolve),
    children: menus
  },
  {
    path: '*',
    redirect: '/404'
  }
];
router.addRoutes(allowRoutes);

router.beforeEach((to, from, next) => {
  let routeName = to.meta.name || to.name;
  window.document.title = (routeName ? routeName + ' - ' : '') + '博客管理';
  next();
});

export default router
