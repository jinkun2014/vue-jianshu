<template>
  <el-row style="height: 100%;overflow-y:hidden;">
    <el-col :span="4" style="height: 100%;">
      <div style="padding: 15px 0;text-align: center;">
        <el-button round style="width: 80%;color:#ec7259;background: transparent;border: 1px solid #ec7259;" @click="back()">返回</el-button>
      </div>
      <ul class="list">
        <template v-for="(x, index) in trashList">
          <li class="item" :class="{active:x.id==current.id}" @click="onItemClick(x)">
            <div>
              <span class="text" style="float:left;width: 90%;">
                {{x.title}}
              </span>
              <span
                v-if="x.id==current.id"
                @click="revert(x)"
                class="text"
                style="float: right;text-align: right;font-size: 16px;">
                <i class="fa fa-reply" title="恢复文章" style="color:#42c02e"></i>
              </span>
            </div>
          </li>
        </template>
      </ul>
    </el-col>
    <el-col :span="20" style="height: 100%;padding-bottom: 40px">
      <div style="background: #fff;border-left: 1px solid #ccc;padding: 0 20px;border-bottom: 1px solid #d9d9d9;height: 60px;line-height: 60px">
        <span>{{current.title}}</span>
        <span style="float: right">{{current.gmtModified}}</span>
      </div>
      <div style="background: #fff;height: 100%;border-left: 1px solid #ccc;">
        <editor
          :value="content"
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
        trashList: [
          // {
          //   id: 96,
          //   title: "2018-9-9",
          //   gmtModified: "2018-09-09 12:26:01",
          //   categoryId: 1
          // },
        ],
        current: {
          id: 0,
          title: "",
          gmtModified: "",
          categoryId: 0
        },
        content: ""
      };
    },
    watch: {
      "current.id"() {
        let vm = this;
        if (vm.current.id != 0) {
          vm.loadTrashContent(vm.current.id);
        }
      }
    },
    methods: {
      loadTrashList() {
        let vm = this;
        article.trashList.r()
          .then(data => {
            if (data && data.length > 0) {
              vm.trashList = data
              vm.onItemClick(data[0])
            }
          })
          .catch(util.catchError)
      },
      loadTrashContent(articleId) {
        let vm = this;
        article.content.r(articleId)
          .then(data => {
            vm.content = data.content;
          })
          .catch(util.catchError)
      },
      onItemClick(current) {
        this.current = current;
      },
      back() {
        let vm = this;
        vm.$router.push({path: "/write"})
      },
      revert(current) {
        let vm = this;

        // 选中当前分类文章
        util.local("currentCategoryId", current.categoryId);
        util.local("currentArticleId", current.id);

        if (current) {
          article.trashRevert.r(current.id)
            .then(data => {
              vm.$router.push({path: "/write"})
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
      this.loadTrashList()
    }
  }
</script>
<style scoped>
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
