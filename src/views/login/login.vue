<template>
  <div class="login-container">
    <div class="g-center login-page" @keyup.enter="login">
      <el-form class="login-form" ref="loginForm" :model="user" :rules="rules">
        <h1 class="main-title">Vue-Admin-Template</h1>
        <p class="main-des">Admin based Vue</p>
        <div class="login-input">
          <el-form-item prop="username">
            <el-input placeholder="输入用户名" v-model="user.username">
              <template slot="append"><i class="el-icon-mobile-phone"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="输入密码" type="password" v-model="user.password">
              <template slot="append"><i class="el-icon-info"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width:100%" @click="submitForm('loginForm')" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import * as util from '../../assets/util';
  import * as login from '../../api/login';

  export default {
    data() {
      return {
        user: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
        },
        isBtnLoading: false
      };
    },
    computed: {
      btnText() {
        if (this.isBtnLoading) {
          return '登录中...';
        }
        return '登录';
      }
    },
    methods: {
      submitForm(formName) {
        let vm = this;
        vm.$refs[formName].validate((valid) => {
          if (valid) {
            vm.login();
          }
        });
      },
      login() {
        var vm = this;
        vm.isBtnLoading = true;

        let loginParams = {loginName: vm.user.username, pass: vm.user.password};
        login.requestLogin(loginParams)
          .then(data => {
            vm.isBtnLoading = false;
            if (data) {
              //缓存用户
              util.session('user', data);

              //调用App.vue的login方法，跳转到指定的页面
              vm.$emit('login', vm.$router.currentRoute.query.from);
            }
          })
          .catch(util.catchError)
          .catch(error => {
            vm.isBtnLoading = false;
          });
      }
    },
    created() {
      sessionStorage.clear();
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./login";
</style>
