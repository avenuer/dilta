import { BrowserWindow } from 'electron';

const Extensions = [
  `C:/Users/AbiZeus/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.15.3_0`,
  `C:/Users/AbiZeus/AppData/Local/Google/Chrome/User Data/Default/Extensions/elgalmkoelokbchhkhacckoklkejnhcd/1.19.1_0`
];

export async function addExtension(browserWindow: BrowserWindow) {
  Extensions.forEach(async path => {
    await BrowserWindow.addDevToolsExtension(path);
  });
}

