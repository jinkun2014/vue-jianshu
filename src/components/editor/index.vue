<!--
Markdown编辑器
相关依赖
npm install marked --save
npm install highlight.js --save
npm install font-awesome --save-dev
-->
<template>
  <div class="md" :class="temp_fullscreen?'fullscreen':''">
    <div class="md-top">
      <template v-for="(tool, index) in temp_toolbar">
        <span
          class="op-btn"
          title="粗体 (ctrl+b)"
          :title="tool.title"
          :class="{'left': tool.float=='left', 'right': tool.float=='right'}"
          @click="$click(tool.callback)"
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
      <!--:title="temp_fullscreen?'退出全屏':'全屏'"-->
      <!--@click="$fullscreen(!temp_fullscreen)">-->
      <!--<i :class="temp_fullscreen?'fa fa-compress selected':'fa fa-arrows-alt'"></i>-->
      <!--</span>-->
      <!--</div>-->
    </div>
    <div class="md-panel">
      <div class="left" :class="temp_fullscreen?'':'single-edit'">
        <div class="auto-textarea-wrapper">
            <textarea
              class="auto-textarea-input"
              spellcheck="false"
              ref="mTextarea"
              v-model="temp_value"
              :autofocus="temp_autofocus"
              :placeholder="placeholder"
              :style="{fontSize: fontSize , lineHeight: lineHeight}"
              :class="{'no-border': !border , 'no-resize': !resize}"
              @focus="$in"
              @blur="$out"
              @scroll="$edit_scroll"/>
        </div>
      </div>
      <div ref="showPanel" class="right" :style="{display:temp_fullscreen?'block':'none'}">
        <div
          class="markdown-body"
          style="padding: 15px;box-sizing: border-box;height: 100%"
          v-html="temp_html">
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Marked from 'marked'
  import hljs from 'highlight.js'
  import {keydownListen} from "./lib/keydown-listen";
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
      toolbar: {
        type: Array,
        default: null
      },
      fullscreen: {
        type: Boolean,
        default: false
      },
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
      autofocus: {
        type: Boolean,
        default: false
      },
      value: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
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
    },
    data() {
      return {
        temp_toolbar: [
          {
            text: "<i class=\"fa fa-bold\"></i>",
            title: "粗体",
            float: "left",
            callback: this.$B
          },
          {
            text: "<i class=\"fa fa-picture-o\"></i>",
            title: "图片",
            float: "left",
            callback: this.$Image
          },
          {
            /* 这个不知道怎么切换图标状态，感觉好low */
            text: "<i id='full' class=\"fa fa-compress\" style=\"display: none\"></i><i id='notfull' class=\"fa fa-arrows-alt\"></i>",
            title: "全屏",
            float: "right",
            callback: function ($vm) {
              if ($vm.temp_fullscreen) {
                document.getElementById("full").style.display = 'none';
                document.getElementById("notfull").style.display = 'inline-block';
              } else {
                document.getElementById("full").style.display = 'inline-block';
                document.getElementById("notfull").style.display = 'none';
              }
              $vm.$fullscreen(!$vm.temp_fullscreen)
            }
          },
          {
            text: "保存",
            title: "保存",
            float: "right",
            callback: this.$save
          },
        ],
        temp_html: (() => {
          return Marked(this.value);
        })(),
        temp_value: (() => {
          return this.value;
        })(),
        temp_fullscreen: (() => {
          return this.fullscreen;
        })(),
        temp_autofocus: (() => {
          if (this.autofocus) {
            return 'autofocus'
          }
          return null;
        })()
      };
    },
    methods: {
      $click(callback) {
        typeof callback === 'function' && callback(this);
      },
      $fullscreen(fullscreen) {
        this.temp_fullscreen = !this.temp_fullscreen
      },
      $save() {
        if (this.onSave) {
          this.onSave(this.temp_value, this.temp_html);
        }
      },
      $B() {
        this.temp_value = insertTextAtCaret(this.$refs.mTextarea, {prefix: "**", subfix: "**", str: ""});
      },
      $Image() {
        this.temp_value = insertTextAtCaret(this.$refs.mTextarea, {prefix: "![](", subfix: ")", str: ""});
      },
      $removeLine() {
        this.temp_value = removeLine(this.$refs.mTextarea);
      },
      $tab() {
        this.temp_value = insertTab(this.$refs.mTextarea);
      },
      $untab() {
        this.temp_value = unInsertTab(this.$refs.mTextarea);
      },
      $edit_scroll($event) {
        let ratio = this.$refs.mTextarea.scrollTop / (this.$refs.mTextarea.scrollHeight - this.$refs.mTextarea.offsetHeight);
        let height = ratio * (this.$refs.showPanel.scrollHeight - this.$refs.showPanel.offsetHeight);
        this.$refs.showPanel.scrollTop = height;
      },
      $in() {
        if (this.onFocus) {
          this.onFocus(true);
        }
      },
      $out() {
        if (this.onFocus) {
          this.onFocus(false);
        }
      }
    },
    mounted() {
      let vm = this;
      // 监听事件
      keydownListen(vm)
    },
    watch: {
      value: function (val, oldVal) {
        this.temp_value = val
      },
      temp_value: function (val, oldVal) {
        this.temp_html = Marked(val)
        if (this.onChange) {
          this.onChange(val, this.temp_html);
        }
        //this.$emit("onChange", val, this.temp_html);
      },
      fullscreen: function (val, oldVal) {
        this.temp_fullscreen = val
      },
      temp_fullscreen: function (val, oldVal) {
        if (this.onFullscreen) {
          this.onFullscreen(oldVal);
        }
        //this.$emit("onFullscreen", val);
      }
    },
    created() {
      // 初始化Marked的选项
      let renderer = new Marked.Renderer();
      // Override function
      renderer.heading = function (text, level) {
        var escapedText = text;//.toLowerCase().replace(/[^\w]+/g, '-');

        return `<h${level}><a id="${escapedText}" href="#"></a>${text}</h${level}>`;
      };

      Marked.setOptions({
        renderer: renderer,
        sanitize: true,
        highlight: function (code) {
          return hljs.highlightAuto(code).value;
        },
      })
    }
  };
</script>
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
    background: #fbfbfb;
  }

  .md-panel .single-edit {
    width: 100%;
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 100%;
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    overflow-y: auto;
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
