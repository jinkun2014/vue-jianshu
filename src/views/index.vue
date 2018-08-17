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
          <el-button type="text" icon="el-icon-edit" style="color:#fff" @click="show = !show">新建文集</el-button>
        </div>
        <!-- 新建文集表单 -->
        <div style="padding: 0 15px;">
          <el-collapse-transition>
            <div v-if="show">
              <input type="text" placeholder="请输入文集名..." style="width: 90%;height:25px;color: #ccc;background-color: #595959;border: 1px solid #333;padding: 4px 6px;outline: 0;margin-bottom: 5px;"/>
              <el-button round size="mini" style="background: transparent;color:#42c02e;border: 1px solid #42c02e;">提交</el-button>
              <el-button type="text" size="mini" style="color:#ccc" @click="show = false">取消</el-button>
              <div style="height: 10px;"></div>
            </div>
          </el-collapse-transition>
        </div>
        <!-- 文集列表 -->
        <div>
          <ul class="category-list">
            <li class="item active">
              <span class="text">Linux</span>
              <el-dropdown trigger="click" size="mini" style="float: right">
                <el-button type="text" icon="el-icon-setting" style="color:#f2f2f2"></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button
                      type="text"
                      style="color: #333">
                      修改文集
                    </el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button
                      type="text"
                      style="color: #333">
                      删除文集
                    </el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
            <li class="item">
              <span class="text">Hbase</span>
              <el-dropdown trigger="click" size="mini" style="float: right">
                <el-button type="text" icon="el-icon-setting" style="color:#f2f2f2"></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button
                      type="text"
                      style="color: #333">
                      修改文集
                    </el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button
                      type="text"
                      style="color: #333">
                      删除文集
                    </el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </div>
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
          <li class="item active">
            <span class="text">2018-08-16</span>
            <el-dropdown trigger="click" size="mini" style="float: right">
              <el-button type="text" icon="el-icon-setting" style="color:#333"></el-button>
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
                    style="color: #333">
                    删除文章
                  </el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li class="item">
            <span class="text">2018-08-17</span>
            <el-dropdown trigger="click" size="mini" style="float: right">
              <el-button type="text" icon="el-icon-setting" style="color:#333"></el-button>
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
                    style="color: #333">
                    删除文章
                  </el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li class="footer">
            <i class="el-icon-edit"></i>
            <span class="text">在下方新建文章</span>
          </li>
        </ul>
      </div>
    </el-col>

    <!-- 文章内容 -->
    <el-col :span="14" style="height: 100%;overflow:auto;">
      <div style="background: #fff;height: 100%;border-left: 1px solid #ccc;overflow:hidden;">
        <div style="height: 20px;background: #ccc"></div>
        <div>
          <input type="text" class="title" value="2018-08-16"/>
        </div>
        <div style="height: 20px;background: #ccc"></div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        form: {
          name: '',
        }
      }
    },
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
    padding: 0 20px 0 15px;
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
    padding: 0 20px 0 12px;
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
    line-height: 60px;
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
    padding: 0 80px 10px 40px;
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
