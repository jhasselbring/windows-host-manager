<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { ipcRenderer } from 'electron'
window.ipcRenderer = ipcRenderer
const { port1, port2 } = new MessageChannel()

export default {
  name: 'App',
  mounted(){
    console.log('sending')
ipcRenderer.postMessage('port', { message: 'hello' }, [port1])

  },
  components: {
    HelloWorld
  }
} 
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
