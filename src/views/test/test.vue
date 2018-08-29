<template>
  <div style="height:500px;width: 50%">
    <editor
      v-model="value"
      :fullscreen="fullscreen"
      :onFullscreen="$onFullscreen"
      :onChange="$onChange"
      :onSave="$onSave"/>
  </div>
</template>

<script>
  import editor from '../../components/editor'

  export default {
    components: {
      editor
    },
    data() {
      return {
        fullscreen: false,
        value: "123456",
      }
    },
    watch: {
      value: function (val, oldVal) {
        console.info(val)
      }
    },
    methods: {
      $onFullscreen: function (fullscreen) {
        console.info(fullscreen);
      },
      $onChange: function (value, html) {
        console.info("change-value:" + value);
      },
      $onSave: function (value, html) {
        console.info("save:" + html);
      }
    },
    mounted() {
      //editor.$fullScreen(true);
    }
  }
</script>

<style scoped>

</style>
