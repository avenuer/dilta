import { BrowserWindowConstructorOptions } from 'electron';
import { AppliationOutputDir } from '@dilta/shared';


export interface WindowConfig {
  path: AppliationOutputDir;
  config?: BrowserWindowConstructorOptions;
}

export const SETUP_WINDOW_CONFIG: WindowConfig = {
  path: AppliationOutputDir.setup,
};

export const PROGRAM_WINDOW_CONFIG: WindowConfig = {
  path: AppliationOutputDir.program,
  config: { width: 603, height: 760, show: false }
};
