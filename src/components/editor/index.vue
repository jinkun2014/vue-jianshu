<!--
Markdown编辑器
相关依赖
npm install marked --save
npm install highlight.js --save
npm install font-awesome --save-dev
-->
<template>
  <div class="md" :class="i_v_fullscreen?'fullscreen':''">
    <div class="md-top">
      <template v-for="(tool, index) in i_v_toolbar">
        <span
          class="op-btn"
          title="粗体 (ctrl+b)"
          :title="tool.title"
          :class="{'left': tool.float=='left', 'right': tool.float=='right'}"
          @click="$click(tool.callback,index)"
          v-html="tool.text">
        </span>
      </template>
      <!--<span class="op-btn" title="粗体 (ctrl+b)" @click="$B()"><i class="fa fa-bold"></i></span>-->
      <!--<div class="top-left-item">-->
      <!--<span class="op-btn" title="图片" @click="$Image()"><i class="fa fa-picture-o"></i></span>-->
      <!--</div>-->
      <!--<div class="top-right-item">-->
      <!--<span class="op-btn" title="保存">保存</span>-->
      <!--<span class="op-btn" title="保存" @click="$save()"><i class="fa fa-floppy-o"></i></span>-->
      <!--<span class="op-btn"-->
      <!--title="保存"-->
      <!--:title="i_v_fullscreen?'退出全屏':'全屏'"-->
      <!--@click="$fullscreen(!i_v_fullscreen)">-->
      <!--<i :class="i_v_fullscreen?'fa fa-compress selected':'fa fa-arrows-alt'"></i>-->
      <!--</span>-->
      <!--</div>-->
    </div>
    <div class="md-panel">
      <div class="left" :class="i_v_fullscreen?'':'single-edit'">
        <div class="auto-textarea-wrapper">
            <textarea
              class="auto-textarea-input"
              spellcheck="false"
              ref="mTextarea"
              v-model="i_v_value"
              :autofocus="i_v_autofocus"
              :placeholder="placeholder"
              :style="{fontSize: fontSize , lineHeight: lineHeight}"
              :class="{'no-border': !border , 'no-resize': !resize}"
              @focus="$i_e_in"
              @blur="$i_e_out"
              @scroll="$i_e_editScroll"
              @paste="$i_e_paste"/>
        </div>
      </div>
      <div ref="showPanel" class="right" :style="{display:i_v_fullscreen?'block':'none'}">
        <div style="height: 100%">
          <div class="markdown-body"
               style="padding: 15px 15px 40px 15px;;box-sizing: border-box;"
               v-html="i_v_html">
          </div>
        </div>
      </div>
    </div>
    <div class="md-popup" v-if="i_v_showPopupOverlay">
      <div v-if="i_v_showImagePopup" style="width: 100%;height: 100%;position: relative">
        <div style="width:320px;height:100px;position:absolute;left:50%;top:50%;margin-top: -50px;margin-left: -160px;">
          <span style="position: relative;display: inline-block;overflow: hidden;width: 100%;text-align: center;background: #333;color: #fff;height: 42px;line-height: 42px;cursor: pointer;">
            <span>点击上传</span>
            <input ref="fileUpload" @change="$i_t_imageUpload" type="file" accept="image/*"
                   style="position: absolute;left: 0px;top: 0px;opacity: 0;-ms-filter: 'alpha(opacity=0)';height: 100%;width: 100%;">
          </span>
          <div style="width: 100%;text-align: center;height: 42px;line-height: 42px;cursor: pointer;">
            <span @click="$i_t_imageLink" style="text-decoration: underline;">插入连接</span>
          </div>
        </div>
        <div style="width:60px;height:30px;position:absolute;bottom:10%;right:10%;text-align: center;cursor: pointer;">
          <span style="text-decoration: underline;" @click="$i_t_cancelImage">取消</span>
        </div>
      </div>
    </div>
    <div class="md-popup-overlay" v-if="i_v_showPopupOverlay" @click="$i_t_cancelImage"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Marked from 'marked'
  import hljs from 'highlight.js'
  import {keydownListen, keyupListen} from "./lib/keydown-listen";
  import {
    insertTextAtCaret,
    removeLine,
    insertTab,
    unInsertTab,
    scrollLink
  } from './lib/extra-function'

  export default {
    components: {
      Marked
    },
    props: {
      // 工具栏
      toolbar: {
        type: Array,
        default: function () {
          return [
            {
              text: "<i class=\"fa fa-picture-o\"></i>",
              title: "图片",
              float: "left",
              enabled: true,
              callback: (($vm, index) => $vm.$i_t_insertImage())
            },
            {
              text: "<i class=\"fa fa-th\"></i>",
              title: "表格",
              float: "left",
              enabled: true,
              callback: (($vm, index) => $vm.$i_t_insertTable())
            },
            {
              text: "<i class=\"fa fa-code\"></i>",
              title: "代码",
              float: "left",
              enabled: true,
              callback: (($vm, index) => $vm.$i_t_insertCode())
            },
            {
              text: "<i class=\"fa fa-bold\"></i>",
              title: "粗体(ctrl+b)",
              float: "left",
              enabled: true,
              callback: (($vm, index) => $vm.$i_t_insertB())
            },
            {
              text: "<i class=\"fa fa-undo\"></i>",
              title: "撤销(ctrl+z)",
              float: "left",
              enabled: true,
              callback: (($vm, index) => $vm.$i_t_undo())
            },
            {
              text: "<i class=\"fa fa-repeat\"></i>",
              title: "重做(ctrl+shift+z)",
              float: "left",
              enabled: true,
              callback: (($vm, index) => $vm.$i_t_redo())
            },
            // {
            //   text: "<span style=\"position: relative;display: inline-block;overflow: hidden;line-height: 40px;\"><i class=\"fa fa-picture-o\"></i><input type=\"file\" accept=\"image/gif,image/jpeg,image/jpg,image/png,image/svg\" style=\"position: absolute;left: 0px;opacity: 0;-ms-filter: 'alpha(opacity=0)';height: 40px;width: 17px;\"></span>",
            //   title: "图片",
            //   float: "left",
            //   enabled: true,
            //   callback: (($vm, index) => {
            //   })
            // },
            {
              /* 这个不知道怎么切换图标状态，感觉好low */
              text: "<i id='full' class='fa fa-arrows-alt'></i>",
              title: "全屏",
              float: "right",
              enabled: true,
              callback: (($vm, index) => {
                $vm.$i_t_fullscreen(!$vm.i_v_fullscreen)

                let full = "<i class='fa fa-arrows-alt'></i>"
                let notfull = "<i class='fa fa-compress'></i>"
                $vm.i_v_toolbar[index].text = $vm.i_v_fullscreen ? notfull : full
              })
            },
            {
              text: "保存",
              title: "保存(ctrl+s)",
              float: "right",
              enabled: true,
              callback: (($vm, index) => $vm.$i_t_save())
            }
          ]
        }
      },
      // 编辑框
      autofocus: {
        type: Boolean,
        default: false
      },
      fullscreen: {
        type: Boolean,
        default: false
      },
      border: {
        type: Boolean,
        default: false
      },
      resize: {
        type: Boolean,
        default: false
      },
      fontSize: {
        type: String,
        default: '16px'
      },
      lineHeight: {
        type: String,
        default: '30px'
      },
      // 默认值
      value: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: '请输入...'
      },
      // 事件
      onFullscreen: {
        type: Function,
        default: null
      },
      onChange: {
        type: Function,
        default: null
      },
      onSave: {
        type: Function,
        default: null
      },
      onFocus: {
        type: Function,
        default: null
      },
      onImageAdd: {
        type: Function,
        default: null
      }
    },
    data() {
      return {
        // 工具栏
        i_v_toolbar: (() => this.toolbar)(),
        i_v_fullscreen: (() => this.fullscreen)(),
        i_v_autofocus: (() => this.autofocus ? 'autofocus' : null)(),
        i_v_showImagePopup: false,
        i_v_showPopupOverlay: false,
        // props 文本
        i_v_value: "",
        i_v_html: "",
        // 历史记录
        i_v_history_init: false,
        i_v_history: [],
        i_v_history_index: -1,
        i_v_current_timeout: ''
      };
    },
    watch: {
      value: function (val, oldVal) {
        this.i_v_history_init = true;
        this.i_v_value = val
      },
      i_v_value: function (val, oldVal) {
        let $vm = this;

        // 渲染HTML
        $vm.i_v_html = Marked(val)
        // 触发onChange事件
        if ($vm.onChange) {
          $vm.onChange(val, $vm.i_v_html);
        }

        if ($vm.i_v_history_init) {
          $vm.i_v_history_init = false;
          $vm.i_v_history = new Array(val)
          $vm.i_v_history_index = 0;
        } else {
          // 保存历史
          if ($vm.i_v_value === $vm.i_v_history[$vm.i_v_history_index]) return;
          window.clearTimeout($vm.i_v_current_timeout)
          $vm.i_v_current_timeout = setTimeout(() => $vm.i_m_saveHistory(), 500)
        }
      },
      i_v_history_index: function (val, oldVal) {
        let i_vm = this;
        if (i_vm.i_v_history_index > 20) {
          i_vm.i_v_history.shift()
          i_vm.i_v_history_index = i_vm.i_v_history_index - 1
        }
        i_vm.i_v_value = i_vm.i_v_history[i_vm.i_v_history_index]
      },
      i_v_fullscreen: function (val, oldVal) {
        if (this.onFullscreen) {
          this.onFullscreen(oldVal);
        }
      },
    },
    methods: {
      // 工具栏按钮事件
      $i_t_insertImage() {
        this.i_m_showImagePopup();
      },
      $i_t_insertTable() {
        this.i_v_value = insertTextAtCaret(this.$refs.mTextarea, {prefix: "", subfix: "", str: "\r|A|B|C|\r|:--|:--:|--:|\r|1|2|3|\r"});
      },
      $i_t_insertCode() {
        this.i_v_value = insertTextAtCaret(this.$refs.mTextarea, {prefix: "\r```", subfix: "\r```", str: "java\r"});
      },
      $i_t_insertB() {
        this.i_v_value = insertTextAtCaret(this.$refs.mTextarea, {prefix: "**", subfix: "**", str: ""});
      },
      $i_t_undo() {
        this.$i_e_undo()
      },
      $i_t_redo() {
        this.$i_e_redo()
      },
      $i_t_save() {
        this.$i_e_save()
      },
      $i_t_fullscreen(fullscreen) {
        this.i_v_fullscreen = !this.i_v_fullscreen
      },
      // 图片相关
      $i_t_imageLink() {
        this.i_v_value = insertTextAtCaret(this.$refs.mTextarea, {prefix: "![图片描述](", subfix: ")", str: ""});
        this.i_m_hideImagePopup();
      },
      $i_t_imageUpload($e) {
        let img = $e.target.files[0];
        let type = img.type;//文件的类型，判断是否是图片
        let size = img.size;//文件的大小，判断图片的大小
        if ('image/gif, image/jpeg, image/png, image/jpg'.indexOf(type) == -1) {
          alert('请选择我们支持的图片格式！');
          return false;
        }
        if (size > 3145728) {
          alert('请选择3M以内的图片！');
          return false;
        }
        // 这里实现上传逻辑，上传完需要调用i_m_insertImgUrl(url)插入
        if (this.onImageAdd) {
          this.onImageAdd(this, img)
        }
      },
      $i_t_cancelImage() {
        this.i_m_hideImagePopup();
      },
      // 快捷键事件
      $i_e_save() {
        if (this.onSave) {
          this.onSave(this.i_v_value, this.i_v_html);
        }
      },
      $i_e_redo() {
        let $vm = this;
        if ($vm.i_v_history_index < $vm.i_v_history.length - 1) {
          $vm.i_v_history_index++
        }
      },
      $i_e_undo() {
        let $vm = this;
        if ($vm.i_v_history_index > 0) {
          $vm.i_v_history_index--
        }
        let start = $vm.$refs.mTextarea.selectionStart
        let currentLength = $vm.i_v_value.length
        $vm.$nextTick(() => {
          // 光标操作
          start -= currentLength - $vm.i_v_value.length
          $vm.$refs.mTextarea.selectionStart = start
          $vm.$refs.mTextarea.selectionEnd = start
        })
      },
      $i_e_removeLine() {
        this.i_v_value = removeLine(this.$refs.mTextarea);
      },
      $i_e_insertTab() {
        this.i_v_value = insertTab(this.$refs.mTextarea);
      },
      $i_e_unInsertTab() {
        this.i_v_value = unInsertTab(this.$refs.mTextarea);
      },
      $i_e_exitFullscreen() {
        this.i_v_fullscreen = false;
      },
      // 其它事件
      $i_e_editScroll($e) {
        let ratio = this.$refs.mTextarea.scrollTop / (this.$refs.mTextarea.scrollHeight - this.$refs.mTextarea.offsetHeight);
        let height = ratio * (this.$refs.showPanel.scrollHeight - this.$refs.showPanel.offsetHeight);
        if (Math.abs(this.$refs.showPanel.scrollTop - height) < 100) {
          this.$refs.showPanel.scrollTop = height;
        }
      },
      $i_e_in($e) {
        if (this.onFocus) {
          this.onFocus(true);
        }
      },
      $i_e_out($e) {
        if (this.onFocus) {
          this.onFocus(false);
        }
      },
      $i_e_paste($e) {
        var clipboardData = $e.clipboardData;
        if (clipboardData) {
          var items = clipboardData.items;
          if (!items) return;
          var types = clipboardData.types || [];
          var item = null;
          for (var i = 0; i < types.length; i++) {
            if (types[i] === 'Files') {
              item = items[i];
              break;
            }
          }
          if (item && item.kind === 'file') {
            // prevent filename being pasted parallel along
            // with the image pasting process
            $e.preventDefault()
            var oFile = item.getAsFile();
            if (this.onImageAdd) {
              this.onImageAdd(this, oFile)
            }
          }
        }
      },
      // 方法
      $click(callback, index) {
        typeof callback === 'function' && callback(this, index);
      },
      i_m_saveHistory() {
        let i_vm = this;
        i_vm.i_v_history.splice(i_vm.i_v_history_index + 1, i_vm.i_v_history.length)
        i_vm.i_v_history.push(i_vm.i_v_value)
        i_vm.i_v_history_index = i_vm.i_v_history.length - 1
      },
      i_m_showImagePopup() {
        this.i_v_showImagePopup = true;
        this.i_m_showPopupOverlay();
      },
      i_m_hideImagePopup() {
        this.i_v_showImagePopup = false;
        this.i_m_hidePopupOverlay();
      },
      i_m_showPopupOverlay() {
        this.i_v_showPopupOverlay = true
      },
      i_m_hidePopupOverlay() {
        this.i_v_showPopupOverlay = false
      },
      i_m_insertImgUrl(url) {
        this.i_m_hideImagePopup();
        let prefix = "![";
        let subfix = "](" + url + ")\n";
        let str = "图片描述";
        this.i_v_value = insertTextAtCaret(this.$refs.mTextarea, {prefix: prefix, subfix: subfix, str: str});
      }
    },
    mounted() {
      var $vm = this;
      // 监听按下事件
      keydownListen($vm)
    },
    created() {
      // 初始化Marked的选项
      let renderer = new Marked.Renderer();
      // Override function
      renderer.heading = function (text, level) {
        var escapedText = text;//.toLowerCase().replace(/[^\w]+/g, '-');
        return `<h${level}><a id="${escapedText}" href="#"></a>${text}</h${level}>`;
      };
      renderer.image = function (href, title, text) {
        let img = `<div style="text-align: center;"><img src="${href}" style="display:  block;margin: 0px auto;"></div>`
        if (text) {
          img = `<div style="text-align: center;"><img src="${href}" alt="${text}" style="display:  block;margin: 0px auto;"><div style="display: inline-block;padding: 5px 10px;border-bottom: 1px solid #d9d9d9;color: #999;">${text}</div></div>`
        }
        //return `<img src="${href}" alt="${text}" style="display:block;margin: 0 auto"/>`;
        return img;
      }

      Marked.setOptions({
        gfm: true,
        breaks: true,
        renderer: renderer,
        sanitize: true,
        tables: true,
        // highlight: function (code) {
        //   return hljs.highlightAuto(code).value;
        // },
        highlight: function (code, lang) {
          return hljs.highlightAuto(code).value;
        }
      })
    }
  };
</script>
<style>
  @import "css/github-markdown.css";
  @import "css/atom-one-dark.css";

  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
    font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
  }

  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }

  .markdown-body blockquote {
    padding: 0.8em 1em;
    background-color: #f6f8fa;
    border-left: .25em solid #cf2730;
    color: #000 !important;
  }

  .markdown-body a {
    color: #555 !important;
    outline: 0;
    text-decoration: none !important;
    border-bottom: 1px solid #999;
  }

  .markdown-body a:hover {
    border-bottom: 1px solid #000;
  }

  .markdown-body pre{
    display: block;
    overflow-x: auto;
    padding: 1em;
    color: #abb2bf;
    background: #282c34
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .md {
    height: 100%;
    width: 100%;
    overflow: hidden
  }

  .md.fullscreen {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 1501;
  }

  .md-top {
    width: 100%;
    display: block;
    white-space: pre-line;
    min-height: 40px;
    height: 40px;
    border-bottom: none;
    background: #fff;
    z-index: 1;
    box-sizing: border-box;
    border-bottom: 0.1px #eee solid;
    border-top: 0.1px #eee solid;
    padding: 0 10px;
  }

  .md-top .top-left-item, .md-top .top-right-item {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    min-height: 40px;
    height: 40px;
    box-sizing: border-box;
  }

  .md-top .top-left-item {
    text-align: left;
    padding-left: 6px;
  }

  .md-top .top-right-item {
    text-align: right;
    padding-right: 6px;
    max-width: 30%;
  }

  .top-left-item .op-icon {
    display: inline-block;
    cursor: pointer;
    height: 28px;
    width: 28px;
    margin: 6px 0 5px 0px;
    font-size: 15px;
    padding: 4.5px 3px 5px 3.5px;
    color: #757575;
    border-radius: 5px;
    text-align: center;
    background: none;
    border: none;
    outline: none;
    line-height: 1;
    vertical-align: middle;
  }

  .top-right-item .op-icon {
    display: inline-block;
    cursor: pointer;
    height: 28px;
    width: 28px;
    margin: 6px 0 5px 0px;
    font-size: 15px;
    padding: 4.5px 3px 5px 3.5px;
    color: #757575;
    border-radius: 5px;
    text-align: center;
    background: none;
    border: none;
    outline: none;
    line-height: 1;
    vertical-align: middle;
  }

  .op-icon.selected {
    color: rgba(0, 0, 0, 0.8);
    background: #eaeaea;
  }

  .op-btn {
    color: #595959;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding: 0 10px;
  }

  .op-btn:hover {
    cursor: pointer;
    background: #ddd;
  }

  .md-panel {
    position: relative;
    display: flex;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;
    height: calc(100% - 40px);
    box-sizing: border-box;
    overflow: hidden;
  }

  .md-panel .left {
    webkit-box-flex: 0;
    -webkit-flex: 0 0 50%;
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    width: 50%;
    padding: 0;
    overflow: hidden;
    box-sizing: border-box;
    -webkit-transition: all 0.2s linear 0s;
    transition: all 0.2s linear 0s;
    cursor: text;
  }

  .md-panel .right {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 50%;
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    width: 50%;
    overflow-y: auto;
    padding: 0;
    -webkit-transition: all 0.2s linear 0s;
    transition: all 0.2s linear 0s;
    background: #fcfaf2;
  }

  .md-panel .single-edit {
    width: 100%;
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 100%;
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    overflow-y: auto;
  }

  .md .md-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -150px;
    width: 400px;
    height: 300px;
    padding: 0;
    background: #fff;
    color: #333;
    z-index: 9999;
    border-radius: 5px;
  }

  .md .md-popup-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2080;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .auto-textarea-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    line-height: normal;
    .auto-textarea-input {
      box-sizing: border-box;
      font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      margin: 0;
      padding: 15px;
      overflow-y: scroll;
      color: #2C3E50;
      &.no-border {
        outline: 0 none;
        border: none !important;
      }
      &.no-resize {
        resize: none;
      }
    }
  }
</style>
