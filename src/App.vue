<template>
  <titleBar :config="config" />
  <div id="config_container" @click.stop="setFormState('body')">
    <switchContainer
      :config="config"
      :active="active"
      :setFormState="setFormState"
      :formState="formState"
    />
    <entrieshContainer
      :config="config"
      :active="active"
      :setFormState="setFormState"
      :formState="formState"
    />
    <domainsContainer
      :config="config"
      :active="active"
      :setFormState="setFormState"
      :formState="formState"
    />
  </div>
</template>

<script>
import { electron, remote, ipcRenderer } from "electron";
import titleBar from "./components/titleBar";
import switchContainer from "./components/switchContainer";
import entrieshContainer from "./components/entriesContainer";
import domainsContainer from "./components/domainsContainer";
import _ from "lodash";
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
        win.setSize(self.size[0], 34);
        win.setPosition(0, 0);
        this.collapsed = true;
      }
    },
    setFormState(newState) {
      this.formState = newState;
    },
    createNewGroup(name) {
      const sample = {
        enabled: true,
        entries: [],
      };

      // Check if group already exist
      if (this.config.switch[name]) {
        alert(`You already have a group called ${name}`);
      } else {
        this.config.switch[name] = sample;
        this.updateFS();
        this.active.switch = name;
      }
    },
    addIPToGroup(ip) {
      console.log("Adding IP", ip);
      const sample = {
        ip: ip,
        domains: [],
      };

      let existing = _.filter(
        this.config.switch[this.active.switch].entries,
        (o) => {
          return o.ip == ip;
        }
      );
      if (existing.length > 0) {
        alert("This IP already exist.");
      } else {
        this.config.switch[this.active.switch].entries.push(sample);
        this.updateFS();
      }
    },
    addDomainToIP(domain) {
      console.log(domain);
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
.clickable {
  cursor: pointer;
}
.invisible {
  display: none;
}
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
      & > .switch,
      .ips,
      .domains {
        height: 32px;
        line-height: 26px;
      }
      & > .container-header {
        margin: 2px;
        padding: 5px;
        height: auto;
        background-color: rgba(40, 40, 40, 1);
        h1 {
          color: #fff;
          text-shadow: 0 0 15px #000;
          text-align: center;
          margin: 5px;
        }
      }
    }
  }
}
</style>
