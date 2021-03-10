<template>
  <div id="title-bar">
    <div id="title">
      &nbsp;🔥 Host Manager - v0.1.9 <span id="active" v-html="active"></span>
    </div>

    <div id="title-bar-btns">
      <button @click="min" class="purple">➖</button>
      <button @click="close" class="purple">❌</button>
    </div>
  </div>
</template>
<script>
import { remote } from "electron";
import _ from "lodash";
export default {
  data() {
    return {};
  },
  methods: {
    close() {
      var win = remote.getCurrentWindow();
      console.log(win);
      win.close();
    },
    min() {
      this.$parent.toggleBody();
    },
  },
  computed: {
    active() {
      let self = this;
      let list = [];
      _.forEach(self.config.switch, (v, i) => {
        if (v.enabled) {
          list.push('<span class="active">  ' + i + "  </span>&nbsp;");
        }
      });
      return list.join("");
    },
  },
  props: ["config"],
};
</script>
<style lang="scss">
#title-bar {
  // -webkit-app-region: drag;
  height: 34px;
  line-height: 32px;
  background-color: darkviolet;
  padding: none;
  margin: 0px;
  & > #title {
    padding: 2px;
    & > #active {
      & > .active {
        background-color: green;
        padding: 1px;
        border: lightgreen solid 1px;
        border-radius: 15px;
      }
    }
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
