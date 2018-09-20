export default [
  {
    path: '/write',
    name: '写文章',
    component: (resolve) => require(['../views/write/write.vue'], resolve),
  },
  {
    path: '/history',
    name: '查看历史',
    component: (resolve) => require(['../views/history/history.vue'], resolve),
  },
  {
    path: '/trash',
    name: '回收站',
    component: (resolve) => require(['../views/trash/trash.vue'], resolve),
  },
  {
    path: '/site',
    name: '站点设置',
    component: (resolve) => require(['../views/site/site.vue'], resolve),
  }
]
