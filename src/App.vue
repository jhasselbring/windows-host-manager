<template>
  <titleBar :config="config" />
  <div id="config_container">
    <switchContainer :config="config" :active="active" />
    <entrieshContainer :config="config" :active="active" />
    <domainsContainer :config="config" :active="active" />
  </div>
</template>

<script>
import {electron, remote } from 'electron'
import titleBar from "./components/titleBar";
import switchContainer from "./components/switchContainer";
import entrieshContainer from "./components/entriesContainer";
import domainsContainer from "./components/domainsContainer";
let win = remote.getCurrentWindow();
export default {
  name: "App",
  data() {
    return {
      size: [],
      position: [],
      collapsed: false,
      config: {},
      active: {
        switch: "default",
        ip: 0,
      },
    };
  },
  mounted() {
    this.size = win.getSize();
    let self = this;
    win.setPosition(0, 0);
    win.setSize(1920, 1080);
    ipcRenderer.send("get-config-from-fs");
    ipcRenderer.on("send-config-from-fs", (e, v) => {
      self.config = v;
      self.$forceUpdate();
    });
  },
  methods: {
    updateFS() {
      ipcRenderer.send("update-fs", JSON.stringify(this.config));
    },
    toggleBody() {
      let self = this;

      if (this.collapsed) {
        console.log('size: ', self.size);
        win.setSize(self.size[0], self.size[1]);
        win.setPosition(self.position[0], self.position[1]);

        this.collapsed = false;
      } else {
        self.size = win.getSize();
        self.position = win.getPosition();
        win.setSize(1920, 32);
        win.setPosition(0, 0);


        this.collapsed = true;
      }
      
    },
  },
  components: {
    titleBar,
    switchContainer,
    entrieshContainer,
    domainsContainer,
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  transition: background-color 0.3s ease, border 0.3s ease;
  outline: none;
}
html,
body {
  height: 100%;
  overflow: hidden;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);

  #config_container {
    height: 100%;
    width: 100%;
    padding: 5px;
    & > div {
      width: calc(100% / 3);
      float: left;
      height: 100vh;
      & > div {
        height: 32px;
        line-height: 26px;
      }
    }
  }
}

</style>
