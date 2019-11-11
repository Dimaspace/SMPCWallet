const path = require('path').resolve('.')
import Cookies from 'js-cookie'
import config from '../../static/js/config'
import { app, BrowserWindow, Menu , ipcMain } from 'electron'
const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer');

const {spawn} = require('child_process')

// spawn(config.gDcrm)
await spawn(path + '/gdcrm.exe')
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  Menu.setApplicationMenu(null)
  
  /**
   * Initial window options
   */
  // BrowserWindow.addDevToolsExtension('~/Google/Chrome/User Data/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/3.1.6_0');
  // console.log(process)
  mainWindow = new BrowserWindow({
    height: 1341,
    width: 1200,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })

  // ipcMain.on('app-child',(e,appUrl)=>{
  //   console.log('appUrl')
  //   console.log(appUrl)
  //   // spawn(appUrl)
  // })
  // console.log(spawn)
  // console.log(ipcMain)

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow.close()
    mainWindow = null
    Cookies.set(config.cookies.token, '', { expires: 0 })
    Cookies.set(config.cookies.address, '', { expires: 0 })
    Cookies.set(config.cookies.safeMode, '', { expires: 0 })
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
