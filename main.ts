import 'reflect-metadata';

import { devtools, isDev } from 'modules/electron/extenstion';
import { join } from 'path';

// NOTE: Don't change other because of env
// conditional import for environmental variables
const ENV_BASE_PATH = isDev()
  ? join(process.cwd())
  : join(process.cwd(), 'resources', 'app.asar', 'dist');
require('dotenv').config({ path: join(ENV_BASE_PATH, 'electron-builder.env') });

import * as serve from 'electron-serve';

import { BrowserWindow, app, ipcMain } from 'electron';
import {
  ElectronService,
  ProcessIPCTransport,
  WindowConfig,
  bootElectron
} from '@dilta/electron';


const protocol = serve({ directory: 'dist', scheme: 'dilta' });
// Starts the main-computational process
const program = bootElectron((err) => {
  console.error(err);
  app.exit(1);
});

(global as any).program = program;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null;

async function createWindow(config: WindowConfig) {
  // Create the browser window.
  win = new BrowserWindow(
    config.config || { width: 503, height: 671, show: false }
  );
  // off toolbars
  win.setMenu(null);

  // and load the index.html of the app.
  protocol(win);
  win.loadURL(`dilta://dist/${config.path}`);

  // Open the DevTools.
  if (isDev()) {
    win.webContents.openDevTools();
    // add dev functions
    devtools(win);
  }

  /** show but hide if page not rendered */
  win.on('ready-to-show', () => {
    if (!win) {
      return;
    }
    win.show();
  });

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  setTimeout(async () => {
    const config = await (program.injector.get(
      ElectronService
    ) as ElectronService).loadView();
    createWindow(config);
  }, 1000 * 10);
  ProcessIPCTransport(program, ipcMain);
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', async () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    const config = await (program.injector.get(
      ElectronService
    ) as ElectronService).loadView();
    createWindow(config);
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
