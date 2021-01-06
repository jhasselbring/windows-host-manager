<template>
  <div id="domains_container" v-if="(config.switch && config.switch[active.switch] && config.switch[active.switch].entries[active.ip])">
    <div class="container-header"><h1>Domains</h1></div>
    <div
      class="domains"
      v-for="(item, index) in config.switch[active.switch].entries[active.ip].domains"
      :key="index"
      @click.stop=""
    >
      {{ item }}
    </div>
    <div
      v-if="formState != 'new_domain'"
      class="domains add"
      @click.stop="setFormState('new_domain')"
    >
      ➕
    </div>
    <div
      v-if="formState == 'new_domain'"
      class="domains"
      style="padding: 0"
      @click.stop=""
    >
      <input
        @change="newDomainHandler"
        ref="newSwitchField"
        type="text"
        v-model="newDomainValue"
        class="domains"
        style="width: 100%; height: 100%"
        placeholder="Provide a new domain here"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newDomainValue: null,
    };
  },
  methods: {
    newDomainHandler() {
      this.$parent.addDomainToIP(this.newDomainValue);
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
#domains_container {
  & > .domains {
    background-color: rgb(40, 40, 40);
    padding: 2px;
    margin: 2px;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    border: 1px transparent solid;
    &.add {
      background-color: lightgreen;
      text-align: center;
      cursor: pointer;
      &:hover {
        background-color: green;
        border: 1px solid lightgreen;
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
