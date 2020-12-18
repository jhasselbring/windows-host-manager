import { createApp } from 'vue'
import App from './App.vue'
import { ipcRenderer } from "electron";
window.ipcRenderer = ipcRenderer;
import globalState from './globalState';
window.globalState = globalState;


globalState.init(ipcRenderer);

createApp(App).mount('#app')
