'use strict'

import { app, BrowserWindow, Tray } from 'electron'
import CronJob from '../utils/cronjobs'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

/**
 * @type { BrowserWindow }
 */
let mainWindow
/**
 * @type { Tray }
 */
let tray
let cronJob

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    useContentSize: false,
    minHeight: 550,
    minWidth: 500,
    maxHeight: 550,
    maxWidth: 500,
    height: 550,
    width: 500,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function createTray () {
  tray = new Tray(`${__static}/icon_w/png/16x16.png`)

  tray.setToolTip('Currency Monitor')

  tray.on('click', () => {
    console.log(mainWindow)
    if (!mainWindow) createWindow()
    else mainWindow.focus()
  })
}

function createCronJob () {
  cronJob = CronJob()

  cronJob.on('currency-update', (value) => {
    console.log(value)
    if (mainWindow) {
      mainWindow.webContents.send('update-currency', value)
    }

    if (tray) {
      let key = Object.keys(value.rates)[0]
      tray.setTitle(value.rates[key].toString().substring(0, 5))
    }
  })
}

app.on('ready', () => {
  createTray()
  createWindow()
  createCronJob()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    // createWindow()
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
