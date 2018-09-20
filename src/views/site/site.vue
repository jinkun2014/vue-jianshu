<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="10">
      <el-form ref="form" :model="site" label-width="80px" style="margin-top: 50px">
        <el-form-item label="站点名称">
          <el-input size="medium" v-model="site.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input size="medium" v-model="site.description"></el-input>
        </el-form-item>
        <el-form-item label="网址">
          <el-input size="medium" v-model="site.url"></el-input>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input size="medium" v-model="site.keyword"></el-input>
        </el-form-item>
        <el-form-item label="主题">
          <el-input size="medium" :disabled="true" v-model="site.theme"></el-input>
        </el-form-item>
        <el-form-item label="签名">
          <el-input type="textarea" autosize v-model="site.sign"></el-input>
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
  import * as site from '../../api/site'

  export default {
    data() {
      return {
        site: {
          name: '',
          description: '',
          url: '',
          keyword: '',
          theme: 'default',
          sign: '',
        }
      }
    },
    methods: {
      get() {
        let vm = this;
        let user = util.session('user');

        site.get.r(user.id)
          .then(data => {
            if (data) {
              vm.site = data;
            }
          })
          .catch(util.catchError)
      },
      onSubmit() {
        console.log('submit!');
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
