<template>
  <div id="app">
    <transition name="el-fade-in-linear">
      <router-view @login="loginDirect" @logout="logoutDirect"/>
    </transition>
  </div>
</template>

<script>
  import * as util from './assets/util';

  export default {
    name: 'App',
    methods: {
      //登录成功后跳转到指定的路由
      loginDirect(newPath) {
        this.login(() => {
          this.$router.replace({path: newPath || '/write'});
        });
      },
      logoutDirect() {

      },
      login(cb) {
        let vm = this;
        let localUser = util.session('user');
        if (!localUser) {
          return vm.$router.push({path: '/login', query: {from: vm.$router.currentRoute.path}});
        }

        typeof cb === 'function' && cb();
      }
    },
    created() {
      this.login();
    }
  }
</script>

<style>
  #app {
    height: 100%;
    width: 100%;
    font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
  }
</style>
