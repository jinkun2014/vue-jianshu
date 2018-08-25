import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: (resolve) => require(['../views/index.vue'], resolve),
      children: [
        {
          path: '/write',
          name: '写文章',
          component: (resolve) => require(['../views/write/write.vue'], resolve),
        }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: (resolve) => require(['../views/login/login.vue'], resolve),
    }
  ]
})
