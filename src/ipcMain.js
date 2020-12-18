import { ipcMain } from 'electron'
import fs from 'fs'

let bus = ipcMain; // Alias for ipcMain


// Waits for get config request from Renderer
bus.on('get-config-from-fs', (e, msg) => {
console.log('Recd get-config-from-fs')
  // Read config from FS
  let config = 'C:\\Windows\\System32\\drivers\\etc\\hosts.json';

  try {
    // Read file
    const data = fs.readFileSync(config, 'utf8')

    // Respond
    e.reply('send-config-from-fs', JSON.parse(data));
  } catch (err) {
    console.error(err)
  }

})