<template>
  <el-row style="height: 100%;">
    <!-- 文集列表 -->
    <el-col :span="4" style="height: 100%;">
      <div style="background: #404040;height: 100%;overflow:auto;">
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
            @click="category.show = !category.show">
            新建文集
          </el-button>
        </div>
        <!-- 新建文集表单 -->
        <div style="padding: 0 15px;">
          <el-collapse-transition>
            <div v-if="category.show">
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
                @click="category.show = false">
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
                          style="color: #333"
                          @click="onCategoryEdit(c.id,c.name)">
                          修改文集
                        </el-button>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <el-button
                          type="text"
                          style="color: #333"
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
      <div style="background: #fff;height: 100%;overflow:auto;">
        <ul class="article-list">
          <li class="header">
            <i class="el-icon-edit"></i>
            <span class="text">新建文章</span>
          </li>
          <draggable v-model="article.articles" @update="articleDragEnd">
            <template v-for="(a, index) in article.articles">
              <li class="item" :class="{active:a.id==article.currentArticle.id}" @click="onArticleClick(a.id)">
                <span class="text">{{a.name}}</span>
                <el-dropdown v-if="a.id==article.currentArticle.id" trigger="click" size="mini"
                             style="float: right;height: 10px;width: 10px;margin-top: 35px;">
                  <el-button type="text" icon="el-icon-setting" style="color:#333;position:absolute;top: -15px;left: -8px"></el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <el-button
                        type="text"
                        style="color: #333">
                        在新窗口打开
                      </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button
                        type="text"
                        style="color: #333">
                        设为私密
                      </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button
                        type="text"
                        style="color: #333"
                        @click="onArticleDel(a.id)">
                        删除文章
                      </el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
            </template>
          </draggable>
          <li class="footer">
            <i class="el-icon-edit"></i>
            <span class="text">在下方新建文章</span>
          </li>
        </ul>
      </div>
    </el-col>

    <!-- 文章内容 -->
    <el-col :span="14" style="height: 100%;overflow:hidden;">
      <div style="background: #fff;height: 100%;border-left: 1px solid #ccc;">
        <el-row>
          <span style="height:20px;float: right;color:#999;">已保存</span>
        </el-row>
        <el-row>
          <input type="text" class="title" value="2018-08-16"/>
        </el-row>
        <el-row style="height: calc(100% - 64px);">
          <mavonEditor v-model="article.content"/>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  // 拖拽排序
  import draggable from 'vuedraggable'
  // Markdown
  import mavonEditor from '../components/editor'

  export default {
    components: {
      draggable,
      mavonEditor
    },
    data() {
      return {
        category: {
          show: false,
          form: {
            name: '',
          },
          categories: [
            {
              id: 1,
              seq: 0,
              name: "Hbase"
            },
            {
              id: 2,
              seq: 1,
              name: "Hadoop"
            },
            {
              id: 3,
              seq: 2,
              name: "Linux"
            },
            {
              id: 4,
              seq: 3,
              name: "Spark"
            }
          ],
          currentCategory: {
            id: 1,
          },
          editDialogShow: false
        },
        article: {
          content: "```java\npublic class Java{\n  public static void main(String[] args) {\n    System.out.println(\"Hello World!\");\n  }\n}\n```",
          articles: [
            {
              id: 1,
              seq: 0,
              name: "2018-08-10"
            },
            {
              id: 2,
              seq: 1,
              name: "2018-08-11"
            },
            {
              id: 3,
              seq: 2,
              name: "2018-08-12"
            },
            {
              id: 4,
              seq: 3,
              name: "2018-08-13"
            }
          ],
          currentArticle: {
            id: 1
          },
        }
      }
    },
    watch: {
      // 深度监听
      "category.show"() {
        let vm = this;
        if (!vm.category.show) {
          vm.category.form.id = null;
          vm.category.form.name = "";
        }
      },
      "category.editDialogShow"() {
        let vm = this;
        if (!vm.category.editDialogShow) {
          vm.category.form.id = null;
          vm.category.form.name = "";
        }
      },
    },
    methods: {
      onCategoryClick(id) {
        console.log('当前选中 :' + id);
        let vm = this;
        vm.category.currentCategory.id = id;
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
          "id": vm.category.form.id,
          "name": vm.category.form.name
        };
        vm.saveCategory(params);
      },
      onCategoryDel(id) {
        let vm = this;
        vm.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            "id": id
          };
          vm.delCategory(params);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      saveCategory(params) {
        let vm = this;

        if (params.id) {
          for (var i = 0; i < vm.category.categories.length; i++) {
            if (vm.category.categories[i].id == params.id) {
              vm.category.categories[i].name = params.name;
            }
          }

          // 还原修改数据
          vm.category.editDialogShow = false;
        } else {
          let categories = new Array();
          let n = {id: new Date().getMilliseconds(), name: params.name, seq: 0};
          categories.push(n);
          for (var i = 0; i < vm.category.categories.length; i++) {
            categories.push(vm.category.categories[i]);
          }
          vm.category.categories = categories;

          // 隐藏编辑对话框
          vm.category.show = false;

          // 选中新增分类
          vm.category.currentCategory.id = n.id;
        }
      },
      delCategory(params) {
        let vm = this;

        if (params.id) {
          let categories = new Array();
          for (var i = 0; i < vm.category.categories.length; i++) {
            if (params.id != vm.category.categories[i].id) {
              categories.push(vm.category.categories[i]);
            }
          }
          vm.category.categories = categories;

          // 还原新增数据
          vm.category.show = false;

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }
      },
      categoryDragEnd(evt) {
        let vm = this;
        for (var i = 0; i < vm.category.categories.length; i++) {
          console.log('拖动后的分类 :' + vm.category.categories[i].name);
        }
      },
      loadArticleList(categoryId) {

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
          let params = {
            "id": id
          };
          vm.delArticle(params);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      delArticle(params) {
        let vm = this;

        if (params.id) {
          let articles = new Array();
          for (var i = 0; i < vm.article.articles.length; i++) {
            if (params.id != vm.article.articles[i].id) {
              articles.push(vm.article.articles[i]);
            }
          }
          vm.article.articles = articles;

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }
      },
      articleDragEnd(evt) {
        let vm = this;
        for (var i = 0; i < vm.article.articles.length; i++) {
          console.log('拖动后的分类 :' + vm.article.articles[i].name);
        }
      },
    }
  }
</script>

<style scoped>
  .category-list {
    height: 100%;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: transparent;
  }

  .category-list li {
    list-style: none;
  }

  .category-list .item {
    font-size: 16px;
    color: #f2f2f2;
    padding: 0 10px 0 15px;
    position: relative;
    cursor: pointer;
    line-height: 40px;
    list-style: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-transition: padding .2s;
    -o-transition: padding .2s;
    transition: padding .2s;
  }

  .category-list .item:hover {
    background-color: #666;
  }

  .category-list .item .text {
    width: 100%;
  }

  .category-list .item.active {
    color: #f2f2f2;
    background-color: #666;
    border-left: 3px solid #ec7259;
    padding: 0 10px 0 12px;
  }

  .article-list {
    height: 100%;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: transparent;
    list-style: none;
  }

  .article-list li {
    list-style: none;
  }

  .article-list .header {
    font-size: 16px;
    color: #595959;
    padding: 0 25px 0 20px;
    position: relative;
    cursor: pointer;
    border-bottom: 1px solid #ccc;
    line-height: 65px;
    list-style: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-transition: padding .2s;
    -o-transition: padding .2s;
    transition: padding .2s;
  }

  .article-list .header:hover {
    color: #000;
  }

  .article-list .item {
    font-size: 20px;
    color: #595959;
    padding: 0 25px 0 20px;
    position: relative;
    cursor: pointer;
    border-bottom: 1px solid #ccc;
    line-height: 80px;
    list-style: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-transition: padding .2s;
    -o-transition: padding .2s;
    transition: padding .2s;
  }

  .article-list .item:hover {
    background-color: #e6e6e6;
  }

  .article-list .item .text {
    color: #333;
    width: 100%;
    line-height: 60px;
  }

  .article-list .item.active {
    background-color: #e6e6e6;
    border-left: 5px solid #ec7259;
    padding: 0 25px 0 15px;
  }

  .article-list .footer {
    font-size: 16px;
    color: #999;
    padding: 10px 25px 0 20px;
    position: relative;
    cursor: pointer;
    line-height: 40px;
    list-style: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-transition: padding .2s;
    -o-transition: padding .2s;
    transition: padding .2s;
  }

  .article-list .footer:hover {
    color: #333;
  }

  .title {
    width: 90%;
    padding: 0 80px 10px 30px;
    margin-bottom: 0;
    border: none;
    font-size: 30px;
    font-weight: 400;
    line-height: 30px;
    -webkit-box-shadow: none;
    box-shadow: none;
    color: #595959;
    background-color: transparent;
    outline: none;
    border-radius: 0;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

</style>
