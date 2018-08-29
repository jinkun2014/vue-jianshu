export default [
  {
    path: '/test',
    name: '测试',
    component: (resolve) => require(['../views/test/test.vue'], resolve),
  },
  {
    path: '/write',
    name: '写文章',
    component: (resolve) => require(['../views/write/write.vue'], resolve),
  }
]
