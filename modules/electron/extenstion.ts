import { BrowserWindow, dialog, globalShortcut } from 'electron';
import { writeFile, readdirSync } from 'fs';
import { join } from 'path';


/**
 * Developer shortcuts for the application
 *
 * @export
 * @enum {number}
 */
export enum AppDevShortcut {
  ScreenShot = 'CommandOrControl + shift + s + t',
  ToggleDevTool = 'CommandOrControl + shift + i'
}

const EXTENSIONS_HOME = join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'User Data', 'Default', 'Extensions')

/**
 * adds 3rd party apps to electron dev tools
 *
 * @export
 */
export async function addExtension() {
  if (false) {
    readdirSync(EXTENSIONS_HOME).map(extdir => {
      const versions = readdirSync(join(EXTENSIONS_HOME, extdir));
      return join(EXTENSIONS_HOME, extdir, versions[versions.length - 1]);
    }).forEach(async path => {
      await BrowserWindow.addDevToolsExtension(path);
    });
  }
}

/**
 * registers devtools shortcuts for the application
 *
 * @export
 * @param {BrowserWindow} browserWindow
 */
export function shortcuts(browserWindow: BrowserWindow) {
  globalShortcut.register(AppDevShortcut.ScreenShot, () =>
    screenShot(browserWindow)
  );
  globalShortcut.register(AppDevShortcut.ToggleDevTool, () =>
    toogleDevTool(browserWindow)
  );
}

/**
 * captures the page as screen shot and tooggle save dialog
 *
 * @export
 * @param {BrowserWindow} browserWindow
 */
export function screenShot(browserWindow: BrowserWindow) {
  browserWindow.capturePage(img => {
    img.toPNG();
    dialog.showSaveDialog(
      browserWindow,
      { title: 'save screen shot' },
      filename => {
        writeFile(filename, img.toPNG(), err => {
          if (err) {
            console.error(err);
          }
        });
      }
    );
  });
}

/**
 * responds by toggling the app devtool with a shortcut
 *
 * @export
 * @param {BrowserWindow} browserWindow
 * @returns
 */
export function toogleDevTool(browserWindow: BrowserWindow) {
  const {
    isDevToolsOpened,
    closeDevTools,
    openDevTools
  } = browserWindow.webContents;
  console.log(isDevToolsOpened());
  return isDevToolsOpened() ? closeDevTools() : openDevTools({ mode: 'detach' });
}

/**
 * registers all dev custom functions
 *
 * @export
 * @param {BrowserWindow} browserWindow
 */
export async function devtools(browserWindow: BrowserWindow) {
  addExtension();
  shortcuts(browserWindow);
}
