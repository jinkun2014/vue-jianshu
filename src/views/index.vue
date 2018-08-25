<template>
  <div id="container">
    <transition name="el-fade-in">
      <router-view/>
    </transition>
  </div>
</template>
<script>
  import * as util from '@/assets/util';

  export default {
    data() {
      return {};
    },
    methods: {},
    created() {
      let localUser = util.session('user');
      if (localUser) {
        this.user = localUser;
        this.$router.push({path: "/write"});
      } else {
        //跳转到登录页
        this.$router.push({path: "/login", query: {from: this.$router.currentRoute.path}});
      }
    }
  }
</script>
<style>
  #container {
    height: 100%
  }
</style>
