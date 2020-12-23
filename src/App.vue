<template>
  <titleBar :config="config" />
  <div id="config_container" @click="toggleBody">
    <switchContainer :config="config" :active="active" :formState="formState" />
    <entrieshContainer :config="config" :active="active" :formState="formState" />
    <domainsContainer :config="config" :active="active" :formState="formState" />
  </div>
</template>

<script>
import { electron, remote, ipcRenderer } from "electron";
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
      formState: null,
      config: {},
      active: {
        switch: "default",
        ip: 0,
      },
    };
  },
  mounted() {
    let self = this;
    win.setPosition(0, 0);

    ipcRenderer.send("get-config-from-fs");
    console.log("size:");
    let size = ipcRenderer.sendSync("getScreenSize");
    win.setSize(size.width, size.height);

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
        win.setSize(self.size[0], self.size[1]);
        win.setPosition(self.position[0], self.position[1]);
        this.collapsed = false;
      } else {
        self.size = win.getSize();
        self.position = win.getPosition();
        win.setSize(self.size[0], 32);
        win.setPosition(0, 0);
        this.collapsed = true;
      }
    },
    seFormState(newState){
      this.formState = newState;
    }
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
body,
#app {
  height: 100%;
  overflow: hidden;
  color: #fff;
  background: rgba(0, 0, 0, 0.1);

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
