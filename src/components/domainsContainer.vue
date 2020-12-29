<template>
  <div id="domains_container" v-if="config.switch">
        <div class="container-header"><h1>Domains</h1></div>
    <div
      class="domains"
      v-for="(item, index) in config.switch[active.switch].entries[active.ip]
        .domains"
      :key="index"
      @click.stop=""
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  props: ["config", "active"],
};
</script>
<style lang="scss" scoped>
#domains_container {

  & > .domains {
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
