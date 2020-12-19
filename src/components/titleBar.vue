<template>
  <div id="title-bar">
    <div id="title">Host Manager</div>
    <div id="title-bar-btns">
      <button id="min-btn">-</button>
      <button id="max-btn">+</button>
      <button @click="close">x</button>
    </div>
  </div>
</template>
<script>
const electron = require("electron");
const path = require("path");
const remote = electron.remote;

export default {
  data() {},
  mounted() {
    // (function() {
    //   document.getElementById("min-btn").addEventListener("click", function(e) {
    //     var window = remote.getCurrentWindow();
    //     window.minimize();
    //   });
    //   document.getElementById("max-btn").addEventListener("click", function(e) {
    //     var window = remote.getCurrentWindow();
    //     if (!window.isMaximized()) {
    //       window.maximize();
    //     } else {
    //       window.unmaximize();
    //     }
    //   });
    //   document
    //     .getElementById("close-btn")
    //     .addEventListener("click", function(e) {
    //     });
    // })();
  },
  methods: {
    close() {
      var win = remote.getCurrentWindow();
      console.log(win)
      win.close();
    },
  },
};
</script>
<style lang="scss">
#title-bar {
  -webkit-app-region: drag;
  height: 24px;
  background-color: darkviolet;
  padding: none;
  margin: 0px;
  & > #title {
    font-size: 800;
    padding: 2px;
  }
  & > #title-bar-btns {
    -webkit-app-region: no-drag;
    position: fixed;
    top: 0px;
    right: 6px;
  }
}
</style>
