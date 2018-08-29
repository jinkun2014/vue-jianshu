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
      <div class="top-left-item">
        <button
          type="button"
          aria-hidden="true"
          title="粗体 (ctrl+b)"
          class="op-icon fa fa-bold"
          @click="$B()"/>
        <button
          type="button"
          aria-hidden="true"
          title="图片 (ctrl+b)"
          class="op-icon fa fa-picture-o"
          @click="$Image()"/>
      </div>
      <div class="top-right-item">
        <button
          type="button"
          aria-hidden="true"
          title="保存 (ctrl+s)"
          class="op-icon fa fa-floppy-o"
          @click="$save()"/>
        <button
          type="button"
          aria-hidden="true"
          class="op-icon"
          :title="temp_fullscreen?'退出全屏':'全屏'"
          :class="temp_fullscreen?'fa fa-compress selected':'fa fa-arrows-alt'"
          @click="$fullscreen(!temp_fullscreen)"/>
      </div>
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
              @keydown.ctrl.s="$save"
              @keydown.ctrl.d="$removeLine"
              @keydown.tab="$tab"
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
  import {
    insertTextAtCaret,
    removeLine,
    insertTab,
    scrollLink
  } from './extra-function'

  export default {
    components: {
      Marked
    },
    props: {
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
        edit_scroll_height: -1,
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
      $fullscreen(fullscreen) {
        this.temp_fullscreen = fullscreen
      },
      $save($event) {
        if (this.onSave) {
          this.onSave(this.temp_value, this.temp_html);
        }
        // 截断事件
        if ($event) {
          $event.returnValue = false;
        }
      },
      $B() {
        this.temp_value = insertTextAtCaret(this.$refs.mTextarea, {prefix: "**", subfix: "**", str: ""});
      },
      $Image() {
        this.temp_value = insertTextAtCaret(this.$refs.mTextarea, {prefix: "![](", subfix: ")", str: ""});
      },
      $removeLine($event) {
        this.temp_value = removeLine(this.$refs.mTextarea);
        // 截断事件
        if ($event) {
          $event.returnValue = false;
        }
      },
      $tab($event) {
        this.temp_value = insertTab(this.$refs.mTextarea);
        // 截断事件
        if ($event) {
          $event.returnValue = false;
        }
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
    display: flex;
    white-space: pre-line;
    -webkit-box-flex: 0;
    -webkit-flex: none;
    -ms-flex: none;
    flex: none;
    min-height: 40px;
    border-bottom: none;
    background: #fff;
    z-index: 1;
    box-sizing: border-box;
    border-bottom: 1px #eee solid;
    border-top: 1px #eee solid;
  }

  .md-top .top-left-item, .md-top .top-right-item {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    min-height: 40px;
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
