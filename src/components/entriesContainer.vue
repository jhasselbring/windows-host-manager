<template>
  <div id="entries_container" v-if="config.switch && config.switch.default">
    <div class="container-header"><h1>IPs</h1></div>
    <div
      v-for="(item, index) in config.switch[active.switch].entries"
      class="ips"
      :class="{ active: active.ip == index }"
      :key="index"
      @click.stop="focusIP(index)"
    >
      {{ item.ip }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    focusIP(index) {
      this.active.ip = index;
    },
  },
  props: ["config", "active"],
};
</script>
<style lang="scss" scoped>
#entries_container {
  & > .ips {
    background-color: rgb(40, 40, 40);
    padding: 2px;
    margin: 2px;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    border: 1px transparent solid;

    &.active {
      background-color: rgb(83, 2, 2);
      &:hover {
        background-color: rgb(131, 4, 4);
        border: 1px #f00 solid;
      }
    }
    &:hover {
      background-color: rgb(50, 50, 50);
      border: 1px #fff solid;
    }
  }
}
</style>
