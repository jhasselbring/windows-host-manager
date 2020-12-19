<template>
  <div id="config_container">
    <div id="switch_container">
      <div v-for="(item, index) in switches" :key="index">{{ item }}</div>
    </div>
    <div id="entries_container">2</div>
    <div id="switch_container">3</div>
  </div>
</template>

<script>
import globalState from "./globalState";

export default {
  name: "App",
  data() {
    return {
      config: {},
    };
  },
  mounted() {
    let self = this;
    ipcRenderer.send("get-config-from-fs");
    ipcRenderer.on("send-config-from-fs", (e, v) => {
      self.config = v;
      console.log("From FS:", v);
      self.$forceUpdate();
    });
  },
  methods: {},
  computed: {
    switches() {
      console.log("1st list", this.config);
      let list = [];

      for (var key in this.config.switch) {
        console.log(this.config.switch[key]);
        list.push(key);
      }
      console.log("2nd list", this.config);
      return list;
    },
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
#config_container {
  height: 100%;
  width: 100%;
  & > div {
    width: 33%;
    float: left;
    height: 100%;
  }
}
</style>
