import AppDirectory from 'appdirectory'

var appData = new AppDirectory({
  appName: "host-manager", // the app's name, kinda self-explanatory
  appAuthor: "FWS", // The author's name, or (more likely) the name of the company/organisation producing this software.
  // Only used on Windows, if omitted will default to appName.
  appVersion: "v0.1.1", // The version, will be appended to certain dirs to allow for distinction between versions.
  // If it isn't present, no version parameter will appear in the paths
  useRoaming: false, // Should AppDirectory use Window's roaming directories?  (Defaults to false)
  // platform: "darwin" // You should almost never need to use this, it will be automatically determined
})

export default appData;