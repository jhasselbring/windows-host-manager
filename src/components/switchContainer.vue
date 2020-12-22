<template>
  <div id="switch_container">
    <div
      v-for="(item, index) in config.switch"
      :key="index"
      class="switch"
      :class="{ active: active.switch == index }"
    >
      <div>
        <span v-if="item.enabled" @click="toggleActive(index)">✅</span>
        <span v-if="!item.enabled" @click="toggleActive(index)">❌</span>
        {{ index }}
        <span class="tool-box">
          <span class="tool edit">🖊</span>
          <span class="tool expand" @click="focusSwitch(index)">▶</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toggleActive(index) {
      this.config.switch[index].enabled = !this.config.switch[index].enabled;
      this.$parent.updateFS();
    },
    focusSwitch(index) {
      this.active.ip = 0;
      this.active.switch = index;
    },
  },
  props: ["config", "active"],
};
</script>
<style lang="scss">
#switch_container {
  & > .switch {
    background-color: rgb(40, 40, 40);
    padding: 4px;
    margin: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    border: 1px transparent solid;
    position: relative;
    visibility: visible;
    &:hover > div > .tool-box > .tool {
      visibility: visible;
      ;
    }
    & > div > .tool-box {
      float: right;
      text-align: right;
      .tool {
        border: 1px solid #fff;
        position: absolute;
        width: 26px;
        height: 26px;
        text-align: center;
        visibility: hidden;
        top: 2px;
        cursor: pointer;
        &:hover{
          border: 1px solid red;
          color: red;
        }
        &.edit {
          right: 35px;
        }
        &.expand {
          right: 2px;
        }
      }
    }
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
