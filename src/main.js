// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import './styles/common.scss'
Vue.use(ElementUI)

import 'font-awesome/scss/font-awesome.scss'

Vue.config.productionTip = false

Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中获取焦点
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
