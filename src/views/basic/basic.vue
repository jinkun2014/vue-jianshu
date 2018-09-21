<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="10">
      <el-form ref="form" :rules="rules" :model="user" label-width="80px" style="margin-top: 50px">
        <el-form-item label="站点名称">
          <el-input size="medium" v-model="user.siteName"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input size="medium" v-model="user.siteDesc"></el-input>
        </el-form-item>
        <el-form-item label="网址">
          <el-input size="medium" v-model="user.url"></el-input>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input size="medium" v-model="user.siteKeyword"></el-input>
        </el-form-item>
        <el-form-item label="主题">
          <el-input size="medium" :disabled="true" v-model="user.siteTheme"></el-input>
        </el-form-item>
        <el-form-item label="签名">
          <el-input type="textarea" autosize v-model="user.siteSign"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input size="medium" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="登录名">
          <el-input size="medium" :disabled="true" v-model="user.loginname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input size="medium" v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" size="medium" v-model="user.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" size="medium" v-model="user.checkPass" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">更新</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import * as util from '../../assets/util'
  import * as basic from '../../api/basic'

  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (this.user.checkPass !== '') {
          this.$refs["form"].validateField('checkPass');
        }
        callback();
      };
      var validateCheckPass = (rule, value, callback) => {
        if (value !== this.user.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        user: {
          id: 1,
          username: "",
          loginname: "",
          email: "",
          url: "",
          siteDesc: "",
          siteKeyword: "",
          siteLogo: "",
          siteName: "",
          siteTheme: "default",
          siteSign: "",
          thumb: "",
          pass: "",
          checkPass: "",
        },
        rules: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validateCheckPass, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      get() {
        let vm = this;
        let user = util.session('user');

        if (!user) {
          return;
        }
        for (let item in vm.user) {
          vm.user[item] = user[item];
        }
      },
      onSubmit() {
        let vm = this;
        vm.$refs["form"].validate((valid) => {
          if (valid) {
            basic.update.r(vm.user.id, vm.user)
              .then(data => {
                vm.user.pass=''
                vm.user.checkPass=''
                util.session('user',vm.user);

                vm.$message({
                  type: 'success',
                  message: '更新成功！',
                  duration: 600
                });
              })
              .catch(util.catchError)
          }
        });
      },
      back() {
        let vm = this;
        vm.$router.push({path: "/write"})
      }
    },
    created() {
      this.get()
    }
  }
</script>

<style scoped>

</style>
