<template>
<titleBar />
  <div id="config_container">
    <div id="switch_container">
      <div
        v-for="(item, index) in config.switch"
        :key="index"
        class="switch"
        :class="{ enabled: item.enabled }"
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
        :key="index"
      >
        {{ item.ip }}
      </div>
    </div>
    <div id="domain_container">3</div>
  </div>
</template>

<script>
import titleBar from './components/titleBar'
export default {
  name: "App",
  data() {
    return {
      config: {},
      active: {
        switch: "default",
        ip: null,
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
      this.active.switch = index;
    },
    toggleActive(index) {
      this.config.switch[index].enabled = !this.config.switch[
        index
      ].enabled;
      this.updateFS();
    },
  },
  computed: {},
  components: {titleBar}
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
#config_container {
  height: 100%;
  width: 100%;
  #switch_container {
    padding: 5px;
    margin: 2px;
    & > .switch {
      background-color: rgb(30, 30, 30);
      padding: 5px;
      margin: 2px;
      cursor: pointer;
      &.enabled {
        background-color: rgb(83, 2, 2);
        &:hover {
          background-color: rgb(131, 4, 4);
        }
      }
      &:hover {
        background-color: rgb(40, 40, 40);
      }
    }
  }
  #entries_container {
    padding: 5px;
    margin: 2px;
    & > .ips {
      background-color: rgb(30, 30, 30);
      padding: 5px;
      margin: 2px;
      cursor: pointer;
      &:hover {
        background-color: rgb(40, 40, 40);
      }
    }
  }
  & > div {
    width: 33%;
    float: left;
    height: 100vh;
  }
}
</style>
