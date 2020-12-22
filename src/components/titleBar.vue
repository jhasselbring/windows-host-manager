<template>
  <div id="title-bar">
    <div id="title"> &nbsp;🔥 Host Manager - v1.0.0</div>
    <div id="title-bar-btns">
      <button @click="min" class="purple">➖</button>
      <button @click="close" class="purple">❌</button>
    </div>
  </div>
</template>
<script>
const electron = require("electron");
const remote = electron.remote;

export default {
  data() {},
  mounted() {},
  methods: {
    close() {
      var win = remote.getCurrentWindow();
      console.log(win);
      win.close();
    },
    min() {
      var win = remote.getCurrentWindow();
      console.log(win);
      win.minimize();
    },
  },
};
</script>
<style lang="scss">
#title-bar {
  -webkit-app-region: drag;
  height: 32px;
  line-height: 32px;

  background-color: darkviolet;
  padding: none;
  margin: 0px;

  & > #title {
    padding: 2px;
  }
  & > #title-bar-btns {
    -webkit-app-region: no-drag;
    position: fixed;
    top: 0px;
    right: 1px;
    & > .purple {
      width: 30px;
      height: 30px;
      border: 0;
      background-color: purple;
      cursor: pointer;
      &:hover {
        background-color: violet;
      }
    }
  }
}
</style>
