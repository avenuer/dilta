import { BrowserWindow, dialog } from 'electron';
import { UpdateCheckResult, autoUpdater } from 'electron-updater';

import { Injectable } from '@dilta/core';

enum UpdateOperations {
  cancel = 'cancel',
  update = 'update'
}

@Injectable()
export class ElectronUpdate {

  constructor() {}

  async checkforUpdate(win: BrowserWindow) {
    try {
      autoUpdater.autoDownload = false;
      const updateInfo = await autoUpdater.checkForUpdatesAndNotify();
      if (updateInfo) {
        this.downloadUpdate(updateInfo, await this.confirmDownload(win, updateInfo));
      }
    } catch (error) {
      dialog.showErrorBox('Dilta Marker Update', 'error updating application');
    }
  }

  /**
   * retrieve the user response for update permission
   *
   * @param {UpdateCheckResult} updateInfo
   * @returns {Promise<boolean>}
   */
  confirmDownload(
    win: BrowserWindow,
    updateInfo: UpdateCheckResult
  ): Promise<boolean> {
    const { cancel, update } = UpdateOperations;
    const ops = [cancel, update];
    return new Promise((resolve, reject) => {
      try {
        dialog.showMessageBox(
          win,
          {
            message: `Marker application version ${
              updateInfo.updateInfo.version
            } update is available`,
            buttons: ops
          },
          (resp, b) => {
            resolve(ops[resp] === update);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * download and installs the update
   *
   * @param {UpdateCheckResult} updateInfo
   * @param {boolean} allowedUpdate
   */
  downloadUpdate(updateInfo: UpdateCheckResult, allowedUpdate: boolean) {
    if (allowedUpdate) {
      autoUpdater.downloadUpdate(updateInfo.cancellationToken);
    }
  }
}
