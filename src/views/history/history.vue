<template>
  <el-row style="height: 100%;overflow-y:hidden;">
    <el-col :span="4" style="height: 100%;">
      <div style="padding: 15px;text-align: center;">
        <el-button round style="width: 250px;color:#ec7259;background: transparent;border: 1px solid #ec7259;" @click="back()">返回</el-button>
      </div>
      <ul class="list">
        <template v-for="(x, index) in historyList">
          <li class="item" :class="{active:x.id==currentHistory.id}" @click="onItemClick(x)">
            <div>
              <span class="text" style="float: left;text-align: left">
                {{x.source==0?'公开发布':x.source==1?'发布更新':x.source==2?'自动保存':'版本恢复'}}
              </span>
              <span
                v-if="x.id==currentHistory.id"
                @click="revert(x)"
                class="text"
                style="float: right;text-align: right;font-size: 16px;">
                <i class="fa fa-reply" title="恢复到这个版本" style="color:#42c02e"></i>
              </span>
              <span class="text" style="float: right;width: 50%;text-align: right;font-size: 14px;margin-right: 10px;">{{x.updateTime}}</span>
            </div>
          </li>
        </template>
      </ul>
    </el-col>
    <el-col :span="20" style="height: 100%;">
      <div style="background: #fff;height: 100%;border-left: 1px solid #ccc;">
        <editor
          :value="currentHistory.content"
          model="preview"/>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  // Markdown
  import editor from '../../components/editor'
  import * as util from '../../assets/util'
  // 文章
  import * as article from '../../api/article'

  export default {
    components: {
      editor
    },
    data() {
      return {
        categoryId: 0,
        articleId: 0,
        historyList: [
          {
            id: 1,
            source: 1,
            content: "你好",
            updateTime: "2018-09-04 17:52:33"
          },
          {
            id: 2,
            source: 1,
            content: "我好",
            updateTime: "2018-09-04 17:52:33"
          },
        ],
        currentHistory: {
          id: 1,
          source: 1,
          content: "# 你好",
          updateTime: "2018-09-04 17:52:33"
        }
      };
    },
    methods: {
      loadHistoryList(articleId) {
        let vm = this;
        article.historyList.r(articleId)
          .then(data => {
            vm.historyList = data
            if (data && data.length > 0) {
              vm.currentHistory = data[0]
            } else {
              vm.currentHistory = {
                id: 0,
                source: 0,
                content: "",
                updateTime: ""
              }
            }
          })
          .catch(util.catchError)
      },
      onItemClick(history) {
        let vm = this;
        vm.currentHistory = history;
      },
      back() {
        let vm = this;
        vm.$router.push({path: "/write", query: {categoryId: vm.categoryId, articleId: vm.articleId}})
      },
      revert(history) {
        let vm = this;
        if (history) {
          let params = {
            historyId: history.id
          }
          article.revert.r(vm.articleId, params)
            .then(data => {
              vm.$router.push({path: "/write", query: {categoryId: vm.categoryId, articleId: vm.articleId}})
              this.$message({
                type: 'info',
                message: '恢复成功！',
                duration: 1000
              });
            })
            .catch(util.catchError)
        }
      }
    },
    created() {
      let vm = this;
      vm.categoryId = vm.$router.currentRoute.query.categoryId;
      vm.articleId = vm.$router.currentRoute.query.articleId;
      vm.loadHistoryList(vm.articleId)
    }
  }
</script>
<style>
  .list {
    height: 100%;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: transparent;
    list-style: none;
    border-right: 1px solid #eee;
    overflow-y: auto;
  }

  .list .item {
    height: 40px;
    line-height: 40px;
    color: #595959;
    padding: 0 25px 0 20px;
    position: relative;
    cursor: pointer;
    border-bottom: 1px solid #ccc;
    list-style: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-transition: padding .2s;
    -o-transition: padding .2s;
    transition: padding .2s;
  }

  .list .item:hover {
    background-color: #e6e6e6;
  }

  .list .item.active {
    background-color: #e6e6e6;
    border-left: 5px solid #ec7259;
    padding: 0 25px 0 15px;
  }

  .list .item .text {
    color: #333;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .list a {
    color: #555 !important;
    outline: 0;
    text-decoration: none !important;
    border-bottom: 1px solid #999;
  }

  .list a:hover {
    border-bottom: 1px solid #000;
  }
</style>
