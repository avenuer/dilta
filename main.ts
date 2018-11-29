import 'reflect-metadata';
import { ProcessIPCTransport, program } from '@dilta/electron';
import { app, BrowserWindow, ipcMain } from 'electron';
import { devtools } from 'modules/electron/extenstion';
import { join } from 'path';

require('dotenv').config();


//  TODO: make conditional import for environmental variables


(global as any).program = program;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 503, height: 671, show: false });
  // off toolbars
  win.setMenu(null);

  // and load the index.html of the app.
  // win.loadFile("index.html");
  // win.loadFile(join(__dirname, 'dist', 'setup', 'index.html'));
  win.loadURL(`http://localhost:4200`);


  // Open the DevTools.
  win.webContents.openDevTools();
  // add dev functions
  devtools(win);

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
  setTimeout(() => {
    createWindow();
  }, 1000 * 5);
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

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
