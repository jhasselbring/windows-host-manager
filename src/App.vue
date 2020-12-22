<template>
  <titleBar />
  <div id="config_container">
    <div id="switch_container">
      <div
        v-for="(item, index) in config.switch"
        :key="index"
        class="switch"
        :class="{ active: active.switch == index }"
        @click="focusSwitch(index)"
      >
        <div>
          <span v-if="item.enabled" @click="toggleActive(index)">✅</span>
          <span v-if="!item.enabled" @click="toggleActive(index)">❌</span>
          {{ index }}
        </div>
      </div>
    </div>
    <div id="entries_container" v-if="config.switch && config.switch.default">
      <div
        v-for="(item, index) in this.config.switch[this.active.switch].entries"
        class="ips"
        :class="{ active: active.ip == index }"
        :key="index"
        @click="focusIP(index)"
      >
        {{ item.ip }}
      </div>
    </div>
    <div id="domains_container" v-if="this.config.switch">
      <div
        class="domains"
        v-for="(item, index) in this.config.switch[this.active.switch].entries[
          this.active.ip
        ].domains"
        :key="index"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import titleBar from "./components/titleBar";
export default {
  name: "App",
  data() {
    return {
      config: {},
      active: {
        switch: "default",
        ip: 0,
      },
    };
  },
  mounted() {
    let self = this;
    ipcRenderer.send("get-config-from-fs");
    ipcRenderer.on("send-config-from-fs", (e, v) => {
      self.config = v; //TODO: Delete
      gS.config = v;
      console.log(gS);
      self.$forceUpdate();
    });
  },
  methods: {
    updateFS() {
      ipcRenderer.send("update-fs", JSON.stringify(this.config));
    },
    focusSwitch(index) {
      this.active.ip = 0;
      this.active.switch = index;
    },
    focusIP(index) {
      this.active.ip = index;
    },
    toggleActive(index) {
      this.config.switch[index].enabled = !this.config.switch[index].enabled;
      this.updateFS();
    },
    test() {
      ipcRenderer.send("test");
    },
  },
  computed: {},
  components: { titleBar },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
html,
body,
#app {
  height: 100%;
  overflow: hidden;
  color: #fff;
  background: rgba(0, 0, 0, 0.05);
  #config_container {
    height: 100%;
    width: 100%;
    padding: 5px;
    #switch_container {
      & > .switch {
        background-color: rgb(40, 40, 40);
        padding: 5px;
        margin: 2px;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        &.active {
          background-color: rgb(83, 2, 2);
          &:hover {
            background-color: rgb(131, 4, 4);
          }
        }
        &:hover {
          background-color: rgb(50, 50, 50);
        }
      }
    }
    #entries_container {
      & > .ips {
        background-color: rgb(40, 40, 40);
        padding: 5px;
        margin: 2px;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        &.active {
          background-color: rgb(83, 2, 2);
          &:hover {
            background-color: rgb(131, 4, 4);
          }
        }
        &:hover {
          background-color: rgb(50, 50, 50);
        }
      }
    }
    #domains_container {
      & > .domains {
        background-color: rgb(40, 40, 40);
        padding: 5px;
        margin: 2px;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        &.active {
          background-color: rgb(83, 2, 2);
          &:hover {
            background-color: rgb(131, 4, 4);
          }
        }
        &:hover {
          background-color: rgb(50, 50, 50);
        }
      }
    }
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
html {
  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>
