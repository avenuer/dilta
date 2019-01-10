import { BrowserWindowConstructorOptions } from 'electron';
import { AppliationOutputDir } from '@dilta/shared'


export interface WindowConfig {
  path: AppliationOutputDir;
  config: BrowserWindowConstructorOptions;
}

export const SETUP_WINDOW_CONFIG: WindowConfig = {
  path: AppliationOutputDir.setup,
  config: {}
};

export const PROGRAM_WINDOW_CONFIG: WindowConfig = {
  path: AppliationOutputDir.program,
  config: {}
};
