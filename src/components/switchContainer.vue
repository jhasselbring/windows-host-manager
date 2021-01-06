<template>
  <div id="switch_container">
    <div class="container-header"><h1>Groups</h1></div>
    <div
      v-for="(item, index) in config.switch"
      :key="index"
      class="switch"
      :class="{ active: active.switch == index }"
      @click.stop="focusSwitch(index)"
    >
      <div>
        <span v-if="item.enabled" @click="toggleActive(index)" class="clickable">✅</span>
        <span v-if="!item.enabled" @click="toggleActive(index)" class="clickable"
          >❌</span
        >
        {{ index }}
        <span class="tool-box">
          <span class="tool edit">⚙</span>
        </span>
      </div>
    </div>
    <div
      v-if="formState != 'new_switch'"
      class="switch add"
      @click.stop="setFormState('new_switch')"
    >
      ➕
    </div>
    <div
      v-if="formState == 'new_switch'"
      class="switch"
      style="padding: 0"
      @click.stop=""
    >
      <input
        @change="newSwitchHandler"
        ref="newSwitchField"
        type="text"
        v-model="newSwitchValue"
        class="switch"
        style="width: 100%; height: 100%"
        placeholder="Provide a new group name here"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newSwitchValue: null,
    };
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
    newSwitchHandler() {
      this.$parent.createNewGroup(this.newSwitchValue);
    },
  },
  props: {
    setFormState: Function,
    config: Object,
    active: Object,
    formState: String,
  },
};
</script>
<style lang="scss" scoped>
#switch_container {
  & > .switch {
    background-color: rgb(40, 40, 40);
    padding: 2px;
    margin: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    border: 1px transparent solid;
    position: relative;
    visibility: visible;
    &.add {
      background-color: lightgreen;
      text-align: center;
      cursor: pointer;
      &:hover {
        background-color: green;
        border: 1px solid lightgreen;
      }
    }
    &:hover > div > .tool-box > .tool {
      visibility: visible;
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
        &:hover {
          border: 1px solid red;
          color: red;
        }
        &.edit {
          right: 2px;
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
