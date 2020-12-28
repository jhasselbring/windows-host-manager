'use strict'

import { ipcMain as bus, screen } from 'electron'
import fs from 'fs'


let fileDir = 'C:\\Windows\\System32\\drivers\\etc\\';
// let fileDir = __dirname + '\\..\\tmp\\';
let fileName = 'hosts';
let hostFile = fileDir + fileName;
let config = fileDir + fileName + '.json';

// Waits for get config request from Renderer
bus.on('get-config-from-fs', (e, msg) => {

  // Read config from FS
  try {
    // Read file
    const data = fs.readFileSync(config, 'utf8')

    // Respond
    e.reply('send-config-from-fs', JSON.parse(data));
  } catch (err) {
    console.error(err)
  }

});

bus.on('update-fs', (e, msg) => {
  msg = JSON.parse(msg);
  let hostData = '';
  for (var key in msg.switch) {
    if (msg.switch[key].enabled == true) {
      hostData = hostData + '\n#' + key + '\n';
      if (msg.switch[key].entries.length >= 0) {
        msg.switch[key].entries.forEach(entry => {
          let domains = entry.domains.join(' ')
          hostData = hostData + entry.ip + ' ' + domains + '\n';
        });
      }
    }
  }
  fs.writeFileSync(config, JSON.stringify(msg, null, "\t"));
  fs.writeFileSync(hostFile, hostData);
});
bus.on('getScreenSize', (e, msg) => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  e.returnValue  = {width, height};
})