<template>
  <div>{{ globalState.config }}</div>
  <button @click="reload">Reload</button>
</template>

<script>
import globalState from "./globalState";

export default {
  name: "App",
  data() {
    return {
      globalState,
      localState: {},
    };
  },
  mounted() {
    ipcRenderer.send("get-config-from-fs");
    ipcRenderer.on("send-config-from-fs", (e, v) => {
      globalState.config = v;
      console.log(v);
      this.$forceUpdate();
    });
  },
  methods: {},
};
</script>

<style lang="scss"></style>
