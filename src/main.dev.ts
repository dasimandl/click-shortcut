/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell, globalShortcut, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { IpcMessages } from './shared/models/IpcMessages.model';

const robot = require('robotjs');
const ioHook = require('iohook');

app.allowRendererProcessReuse = false;

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .then((info) => console.log('INSTALLER', info))
    .catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'resources')
    : path.join(__dirname, '../resources');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
    // globalShortcut.register('CommandOrControl+1', () => {
    //   console.log('CommandOrControl+1 is pressed');
    //   mainWindow?.webContents.send(IpcMessages.GLOBAL_SHORTCUT, 0);
    // });
    // globalShortcut.register('CommandOrControl+2', () => {
    //   console.log('CommandOrControl+2 is pressed');
    //   mainWindow?.webContents.send(IpcMessages.GLOBAL_SHORTCUT, 1);
    // });
    // globalShortcut.register('CommandOrControl+3', () => {
    //   console.log('CommandOrControl+3 is pressed');
    //   mainWindow?.webContents.send(IpcMessages.GLOBAL_SHORTCUT, 2);
    // });
    // globalShortcut.register('CommandOrControl+4', () => {
    //   console.log('CommandOrControl+4 is pressed');
    //   mainWindow?.webContents.send(IpcMessages.GLOBAL_SHORTCUT, 3);
    // });
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  globalShortcut.unregisterAll();

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
ioHook.start();
let currentRowIndex: number | null;

const onMouseMove = (event) => {
  mainWindow?.webContents.send(IpcMessages.MOUSE_MOVED, {
    index: currentRowIndex,
    event,
  });
  console.log('MOVE', event); // { type: 'mousemove', x: 700, y: 400 }
};
const onMouseClick = (event) => {
  mainWindow?.webContents.send(IpcMessages.MOUSE_CLICKED, {
    index: currentRowIndex,
    event,
  });
  currentRowIndex = null;
  console.log('CLICK', event); // { type: 'mousemove', x: 700, y: 400 }
  ioHook.off('mousemove', onMouseMove);
  ioHook.off('mouseclick', onMouseClick);
};
ipcMain.on('GET_MOUSE_POSITION', (_event, index) => {
  currentRowIndex = index;
  console.log('INSIDE GET_MOUSE_POSITION LISTENER');
  ioHook.on('mousemove', onMouseMove);
  ioHook.on('mouseclick', onMouseClick);
});
ipcMain.on(IpcMessages.REGISTER_SHORTCUT, (_event, { shortcut, index }) => {
  console.log(`REGISTERED SHORTCUT: ${shortcut} INDEX: ${index}`);
  globalShortcut.register(shortcut, () => {
    console.log(`SHORTCUT INVOKED: ${shortcut} INDEX: ${index}`);
    mainWindow?.webContents.send(IpcMessages.GLOBAL_SHORTCUT, {
      index,
    });
  });
  mainWindow?.webContents.send(IpcMessages.REGISTER_SHORTCUT_SUCCESS, {
    index,
  });
});
ipcMain.on(IpcMessages.UNREGISTER_SHORTCUT, (_event, { shortcut, index }) => {
  console.log(`UNREGISTERED SHORTCUT: ${shortcut} INDEX: ${index}`);
  globalShortcut.unregister(shortcut);
  mainWindow?.webContents.send(IpcMessages.UNREGISTER_SHORTCUT_SUCCESS, {
    index,
  });
});
