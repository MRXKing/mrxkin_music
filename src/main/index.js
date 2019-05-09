import { app, BrowserWindow,ipcMain,Tray,Menu,nativeImage} from 'electron'
const path = require('path');

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const  iconPath  =  path.join(__dirname, './static/logo.ico')
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 670,
    useContentSize: true,
    width: 1020,
    frame:false,
    minWidth:1020,
    minHeight:670,
    show:false
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', (event) => {
     mainWindow = null;
  })
  mainWindow.on('ready-to-show',() => {
    mainWindow.show()
  })
  ipcMain.on('window-min',() => {
    mainWindow.minimize()
  })
  ipcMain.on('window-max',() => {
    if (mainWindow.isMaximized()) {
          mainWindow.unmaximize()
    } else {
          mainWindow.maximize()
    }
  })
  ipcMain.on('window-close',() => {
    mainWindow.close()
  })
  let tray = new Tray(nativeImage.createFromPath(iconPath));
   const contextMenu = Menu.buildFromTemplate([
      {label: '退出', click: () => {mainWindow.destroy()}},//我们需要在这里有一个真正的退出（这里直接强制退出）
    ])
    tray.setToolTip('mrxkin_music')
    tray.setContextMenu(contextMenu)
    tray.on('click', ()=>{ //我们这里模拟桌面程序点击通知区图标实现打开关闭应用的功能
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
        mainWindow.isVisible() ?mainWindow.setSkipTaskbar(false):mainWindow.setSkipTaskbar(true);
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
