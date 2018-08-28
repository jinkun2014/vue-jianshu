<template>
  <el-row style="height: 100%;">
    <!-- 文集列表 -->
    <el-col :span="4" style="height: 100%;">
      <div style="background: #404040;height: 100%;overflow:auto;"
           v-loading="category.listLoading">
        <!-- 回到首页 -->
        <div style="padding: 30px 18px 5px;text-align: center;z-index: 1000;">
          <el-button round style="padding: 12px 75px;color:#ec7259;background: transparent;border: 1px solid #ec7259;">回首页</el-button>
        </div>
        <!-- 新建文集 -->
        <div style="padding: 0 15px;">
          <el-button
            type="text"
            icon="el-icon-edit"
            style="color:#fff;width: 90%;text-align: left"
            @click="category.addDialogShow = !category.addDialogShow">
            新建文集
          </el-button>
        </div>
        <!-- 新建文集表单 -->
        <div style="padding: 0 15px;">
          <el-collapse-transition>
            <div v-if="category.addDialogShow">
              <input
                v-focus
                type="text"
                v-model="category.form.name"
                placeholder="请输入文集名..."
                style="width: 90%;height:25px;color: #ccc;background-color: #595959;border: 1px solid #333;padding: 4px 6px;outline: 0;margin-bottom: 5px;"/>
              <el-button
                round
                size="mini"
                style="background: transparent;color:#42c02e;border: 1px solid #42c02e;"
                @click="onCategoryAddSubmit()">
                提交
              </el-button>
              <el-button
                type="text"
                size="mini"
                style="color:#ccc"
                @click="category.addDialogShow = false">
                取消
              </el-button>
              <div style="height: 10px;"></div>
            </div>
          </el-collapse-transition>
        </div>
        <!-- 文集列表 -->
        <div>
          <ul class="category-list">
            <draggable v-model="category.categories" @update="categoryDragEnd">
              <template v-for="(c, index) in category.categories">
                <li class="item" :class="{active:c.id==category.currentCategory.id}" @click="onCategoryClick(c.id)">
                  <span class="text">{{c.name}}</span>
                  <el-dropdown v-if="c.id==category.currentCategory.id"
                               trigger="click"
                               size="mini"
                               style="float: right;height: 10px;width:10px;margin: 15px;">
                    <el-button type="text" icon="el-icon-setting"
                               style="color:#f2f2f2;position: absolute;top: -15px;left: -8px;"/>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <el-button
                          type="text"
                          size="medium"
                          style="color: #333;width:100%;text-align: left"
                          @click="onCategoryEdit(c.id,c.name)">
                          修改文集
                        </el-button>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <el-button
                          type="text"
                          size="medium"
                          style="color: #333;width:100%;text-align: left"
                          @click="onCategoryDel(c.id)">
                          删除文集
                        </el-button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </li>
              </template>
            </draggable>
          </ul>
        </div>
        <!-- 编辑文集 -->
        <el-dialog title="请输入新文集名" :visible.sync="category.editDialogShow" width="20%">
          <el-form :model="category.form">
            <el-form-item>
              <el-input v-model="category.form.name" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="category.editDialogShow = false">取 消</el-button>
            <el-button type="primary" @click="onCategoryEditSubmit()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-col>

    <!-- 文章列表 -->
    <el-col :span="6" style="height: 100%;">
      <div style="background: #fff;height: 100%;overflow:auto;"
           v-loading="article.listLoading">
        <ul class="article-list">
          <li class="header" @click="onArticleAddClick(false)">
            <i class="el-icon-edit"></i>
            <span class="text">新建文章</span>
          </li>
          <draggable v-model="article.articles" @update="articleDragEnd">
            <template v-for="(a, index) in article.articles">
              <li class="item" :class="{active:a.id==article.currentArticle.id}" @click="onArticleClick(a.id)">
                <span class="text" style="display: block;height: 60px;line-height: 60px">{{a.title}}</span>
                <el-dropdown v-if="a.id==article.currentArticle.id" trigger="click" size="mini"
                             style="float: right;height: 10px;width: 10px;margin-top: -25px;">
                  <el-button type="text" icon="el-icon-setting" style="color:#333;position:absolute;top: -15px;left: -8px"></el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <el-button
                        type="text"
                        size="medium"
                        style="color: #333;width:100%;text-align: left">
                        在新窗口打开
                      </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button
                        type="text"
                        size="medium"
                        style="color: #333;width:100%;text-align: left"
                        @click="onArticlePublish(1)">
                        发布文章
                      </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button
                        type="text"
                        size="medium"
                        style="color: #333;width:100%;text-align: left"
                        @click="onArticlePublish(0)">
                        设为私密
                      </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button
                        type="text"
                        size="medium"
                        style="color: #333;width:100%;text-align: left"
                        @click="onArticleComment(article.currentArticle.comment!=0?0:1)">
                        {{article.currentArticle.comment!=0?'展示评论':'关闭评论'}}
                      </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button
                        type="text"
                        size="medium"
                        style="color: #333;width:100%;text-align: left"
                        @click="onArticleDel(a.id)">
                        删除文章
                      </el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <div style="display: block;line-height: 20px;font-size: 12px">
                  <span>{{a.status==0?'草稿&nbsp;&nbsp;&nbsp;&nbsp;':'已发布'}}</span>
                  <span style="margin-left: 10px">{{a.comment==0?'评论已展示':'评论已关闭'}}</span>
                </div>
              </li>
            </template>
          </draggable>
          <li class="footer" @click="onArticleAddClick(true)">
            <i class="el-icon-edit"></i>
            <span class="text">在下方新建文章</span>
          </li>
        </ul>
      </div>
    </el-col>

    <!-- 文章内容 -->
    <el-col :span="14" style="height: 100%;overflow:hidden;">
      <div style="background: #fff;height: 100%;border-left: 1px solid #ccc;"
           v-if="article.currentArticle.id != 0"
           v-loading="article.contentLoading">
        <el-row>
          <span style="float: right;margin:5px 10px 0 0;color:#666;" :loading="article.saving">{{ article.saving?'保存中...':'已保存' }}</span>
        </el-row>
        <el-row>
          <input type="text" class="title" v-model="article.currentArticle.title"/>
          <input type="text" class="tag" placeholder="标签1,标签2" v-model="article.currentArticle.tags"/>
        </el-row>
        <el-row style="height: calc(100% - 64px);">
          <mdeditor
            ref="editor"
            v-model="article.currentArticle.markdown"
            :save="onArticleSave"
            :change="onArticleChange"
            :imgAdd="imgAdd"
            :imgDel="imgDel"
            style="height: 100%"/>
        </el-row>
      </div>
      <div v-if="article.currentArticle.id == 0"
           style="background: #fff;height: 100%;border-left: 1px solid #ccc;position: relative;">
        <div style="position: absolute;text-align: center;top: calc(50% - 21px);left: 0;right: 0;">
          新建文章
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  // 拖拽排序
  import draggable from 'vuedraggable'
  // Markdown
  // Local Registration
  import mdeditor from '../../components/mdeditor/index'

  import * as util from '../../assets/util'
  // 分类
  import * as category from '../../api/category'
  // 文章
  import * as article from '../../api/article'

  export default {
    components: {
      draggable,
      mdeditor
    },
    data() {
      return {
        category: {
          listLoading: false,
          addDialogShow: false,
          form: {
            name: '',
          },
          categories: [
            // {
            //   id: 4,
            //   seq: 3,
            //   name: "Spark"
            // }
          ],
          currentCategory: {
            id: 0,
          },
          editDialogShow: false
        },
        article: {
          listLoading: false,
          contentLoading: false,
          articles: [
            // {
            //   id: 1,
            //   seq: 0,
            //   name: "2018-08-10"
            //   status:0
            // },
          ],
          currentArticle: {
            id: 0,
            title: "",
            markdown: "",
            html: "",
            tags: "",
            status: 0,
            comment: 0
          },
          saving: false,
          timeoutSaveId: false
        },
      }
    },
    watch: {
      // 深度监听
      "category.addDialogShow"() {
        let vm = this;
        if (!vm.category.addDialogShow) {
          vm.category.form.name = "";
        }
      },
      "category.editDialogShow"() {
        let vm = this;
        if (!vm.category.editDialogShow) {
          vm.category.form.name = "";
        }
      },
      "category.currentCategory.id"() {
        let vm = this;
        if (vm.category.currentCategory.id) {
          vm.loadArticleList(vm.category.currentCategory.id)
        }
      },
      "article.currentArticle.id"() {
        let vm = this;
        if (vm.article.currentArticle.id != 0) {
          vm.loadArticle(vm.article.currentArticle.id)
        }
      },
    },
    computed: {
      saving() {
        if (this.isBtnLoading) {
          return '保存中...';
        }
        return '已保存';
      }
    },
    methods: {
      loadCategoryList() {
        let vm = this;
        vm.category.listLoading = true;
        category.list.r()
          .then(data => {
            vm.category.categories = data;
            if (vm.category.categories.length > 0) {
              vm.category.currentCategory.id = vm.category.categories[0].id
            }
            vm.category.listLoading = false;
          })
          .catch(util.catchError);
      },
      onCategoryClick(id) {
        this.category.currentCategory.id = id;
      },
      onCategoryAddSubmit() {
        let vm = this;
        let params = {
          "name": vm.category.form.name
        };
        vm.saveCategory(params);
      },
      onCategoryEdit(id, name) {
        let vm = this;
        vm.category.form.id = id;
        vm.category.form.name = name;
        vm.category.editDialogShow = true;
      },
      onCategoryEditSubmit() {
        let vm = this;
        let params = {
          "name": vm.category.form.name
        };
        vm.updateCategory(vm.category.form.id, params);
      },
      onCategoryDel(id) {
        let vm = this;
        vm.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.delCategory(id);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      saveCategory(params) {
        let vm = this;
        category.save.r(params)
          .then(data => {
            vm.category.categories.unshift(data);
            // 隐藏编辑对话框
            vm.category.addDialogShow = false;
            // 选中新增分类
            vm.category.currentCategory.id = data.id;
          })
          .catch(util.catchError)
      },
      updateCategory(id, params) {
        let vm = this;

        category.update.r(id, params)
          .then(data => {
            for (var i = 0; i < vm.category.categories.length; i++) {
              if (vm.category.currentCategory.id == vm.category.categories[i].id) {
                vm.category.categories[i].name = params.name;
              }
            }

            // 隐藏对话框
            vm.category.editDialogShow = false;
          })
          .catch(util.catchError)
      },
      delCategory(id) {
        let vm = this;
        if (id) {
          category.del.r(id)
            .then(data => {
              let categories = new Array();
              for (var i = 0; i < vm.category.categories.length; i++) {
                if (id != vm.category.categories[i].id) {
                  categories.push(vm.category.categories[i]);
                }
              }
              vm.category.categories = categories;
              if (categories && categories.length > 0) {
                vm.category.currentCategory.id = categories[0].id;
              } else {
                vm.category.currentCategory.id = 0;
              }

              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            })
            .catch(util.catchError)
        }
      },
      categoryDragEnd(evt) {
        let vm = this;
        var params = new Array();
        for (var i = 0; i < vm.category.categories.length; i++) {
          params.push({id: vm.category.categories[i].id, seq: i})
        }
        console.log('拖动后的分类 :' + params);
        category.seq.r(params)
          .then(data => {

          })
          .catch(util.catchError)
      },
      loadArticleList(categoryId) {
        let vm = this;
        vm.article.listLoading = true;
        article.list.r(categoryId)
          .then(data => {
            vm.article.articles = data;
            if (vm.article.articles.length > 0) {
              vm.article.currentArticle.id = vm.article.articles[0].id
            } else {
              vm.article.currentArticle.id = 0
            }
            vm.article.listLoading = false;
          })
          .catch(util.catchError)
      },
      loadArticle(id) {
        let vm = this;
        vm.article.listLoading = true;
        vm.article.contentLoading = true;
        article.get.r(id)
          .then(data => {
            if (data) {
              vm.article.currentArticle = data;
              vm.article.contentLoading = false;
              vm.article.listLoading = false;
            }
          })
          .catch(util.catchError)
      },
      onArticleAddClick(atBottom) {
        let vm = this;
        var params = {
          categoryId: vm.category.currentCategory.id,
          title: new Date().toLocaleDateString().replace('\/', '-').replace('\/', '-'),
          atBottom: atBottom
        };
        vm.article.listLoading = true;
        vm.article.saving = true;
        article.save.r(params)
          .then(data => {
            if (atBottom) {
              vm.article.articles.push(data)
            } else {
              vm.article.articles.unshift(data)
            }
            vm.article.currentArticle.id = data.id;

            vm.article.saving = false;
            vm.article.listLoading = false;
          })
          .catch(util.catchError)
      },
      onArticleClick(id) {
        let vm = this;
        vm.article.currentArticle.id = id;
      },
      onArticleDel(id) {
        let vm = this;
        vm.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.delArticle(id);
        }).catch(() => {
          vm.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      delArticle(id) {
        let vm = this;
        vm.article.listLoading = true;
        article.del.r(id)
          .then(data => {
            let articles = new Array();
            for (var i = 0; i < vm.article.articles.length; i++) {
              if (id != vm.article.articles[i].id) {
                articles.push(vm.article.articles[i]);
              }
            }
            vm.article.articles = articles;
            if (vm.article.articles && vm.article.articles.length > 0) {
              vm.article.currentArticle.id = vm.article.articles[0].id
            } else {
              vm.article.currentArticle.id = 0;
            }

            vm.article.listLoading = false;
          })
          .catch(util.catchError)
      },
      articleDragEnd(evt) {
        let vm = this;
        var params = new Array();
        for (var i = 0; i < vm.article.articles.length; i++) {
          params.push({id: vm.article.articles[i].id, seq: i})
        }
        console.log('拖动后的分类 :' + params);
        article.seq.r(params)
          .then(data => {

          })
          .catch(util.catchError)
      },
      onArticleSave(value, render) {
        let vm = this;

        let digest = '';
        if (render) {
          let el = document.createElement('div');
          el.innerHTML = render;
          let b = el.getElementsByTagName('blockquote')
          if (b && b.length > 0) {
            digest = b[0].innerHTML;
          }
        }

        let params = {
          title: vm.article.currentArticle.title,
          markdown: value,
          html: render,
          digest: digest,
          tags: vm.article.currentArticle.tags
        }
        vm.article.saving = true;
        article.update.r(vm.article.currentArticle.id, params)
          .then(data => {
            vm.article.currentArticle = data;
            for (var i = 0; i < vm.article.articles.length; i++) {
              if (data.id == vm.article.articles[i].id) {
                vm.article.articles[i].title = data.title;
              }
            }
            vm.article.saving = false;

            this.$message({
              type: 'info',
              message: '保存成功！',
              duration: 500
            });
          })
          .catch(util.catchError)
      },
      onArticlePublish(status) {
        let vm = this;
        article.publish.r(vm.article.currentArticle.id, status)
          .then(data => {
            vm.article.currentArticle.status = status;
            for (var i = 0; i < vm.article.articles.length; i++) {
              if (vm.article.currentArticle.id == vm.article.articles[i].id) {
                vm.article.articles[i].status = status;
              }
            }
            vm.$message({
              type: 'info',
              message: '操作成功',
              duration: 1000
            });
          })
      },
      onArticleComment(status) {
        let vm = this;
        article.comment.r(vm.article.currentArticle.id, status)
          .then(data => {
            vm.article.currentArticle.comment = status;
            for (var i = 0; i < vm.article.articles.length; i++) {
              if (vm.article.currentArticle.id == vm.article.articles[i].id) {
                vm.article.articles[i].comment = status;
              }
            }
            vm.$message({
              type: 'info',
              message: '操作成功',
              duration: 1000
            });
          })
      },
      onArticleChange(value, render) {
        // let vm = this;
        // window.clearTimeout(vm.article.timeoutSaveId);
        // vm.article.timeoutSaveId = window.setTimeout(function () {
        //   vm.onArticleSave(value, render)
        // }, 2000);
      },
      imgAdd(pos, $file) {
        let vm = this;
        // var formdata = new FormData();
        // formdata.append('file', $file);
        // article.imgUpload.r(formdata)
        //   .then(data => {
        //     /**
        //      * $vm 指为mavonEditor实例，可以通过如下两种方式获取
        //      * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
        //      * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
        //      */
        //     vm.$refs.editor.$img2Url(pos, data);
        //   })
        //   .catch(util.catchError);

        vm.$refs.editor.$img2Url(pos, new Date().toLocaleTimeString());
      },
      imgDel(pos, $file) {
        console.info(pos + "-" + $file)
      },
    },
    created() {
      this.loadCategoryList();
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./write";
</style>
