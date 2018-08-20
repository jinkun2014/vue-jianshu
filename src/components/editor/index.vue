<template>
  <div id="editor">
    <mavon-editor
      :value="value"
      :toolbars="toolbars"
      :subfield="true"
      :defaultOpen="defaultOpen"
      :scrollStyle="false"
      codeStyle="github"
      @fullScreen="$fullScreen"
      style="height: 100%"/>
  </div>
</template>
<script>
  // Local Registration
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {
    name: 'editor',
    components: {
      mavonEditor
      // or 'mavon-editor': mavonEditor
    },
    props:['value'],
    data() {
      return {
        defaultOpen: "edit",
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: false, // 标题
          underline: false, // 下划线
          strikethrough: false, // 中划线
          mark: false, // 标记
          superscript: false, // 上角标
          subscript: false, // 下角标
          quote: false, // 引用
          ol: false, // 有序列表
          ul: false, // 无序列表
          link: false, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: false, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: false, // 沉浸式阅读
          htmlcode: false, // 展示html源码
          help: false, // 帮助
          /* 1.3.5 */
          undo: false, // 上一步
          redo: false, // 下一步
          trash: false, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: false, // 导航目录
          /* 2.1.8 */
          alignleft: false, // 左对齐
          aligncenter: false, // 居中
          alignright: false, // 右对齐
          /* 2.2.1 */
          subfield: false, // 单双栏模式
          preview: false, // 预览
        }
      }
    },
    methods: {
      $fullScreen(status, value) {
        this.defaultOpen = status ? 'preview' : 'edit';
      }
    }
  }
</script>
<style>
  #editor {
    height: 100%;
  }

  /*设置编辑器的z-index*/
  .v-note-wrapper {
    z-index: 100;
  }

  /*去掉编辑器阴影*/
  .v-note-wrapper .v-note-op {
    box-shadow: none !important;
    border: 1px solid #dcdfe6 !important;
  }

  /*去掉编辑器阴影*/
  .v-note-wrapper .v-note-op .op-icon-divider {
    display: none !important;
  }

  /*去掉编辑器阴影*/
  .v-note-wrapper .v-note-panel {
    box-shadow: none !important;
    border: 1px solid #dcdfe6 !important;
    border-top: none !important;
  }

  /*解决图片过大预览无删除按钮的bug*/
  .v-note-img-wrapper img {
    max-width: 90%;
  }

  /*调整代码字体大小*/
  .markdown-body .hljs {
    font-size: 115% !important;
  }

  .markdown-body strong {
    font-weight: bolder
  }

  .markdown-body .highlight pre, .markdown-body pre {
    padding: 14px;
    font-size: 95%;
  }

  .markdown-body table {
    display: table !important;
  }

  .markdown-body img {
    display: block;
    margin: 0 auto;
  }

  .hljs {
    padding: 0;
  }
</style>
