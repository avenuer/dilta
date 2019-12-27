#### Electron
This modules contains various actions that can only be triggered in an electron based action application.

``` typescript
import { ElectronActions } from '@dilta/shared';

/** Exits the electron application **/
app.execute(ElectronActions.Exit): Promise<void>;

/** Relaunch the electron application **/
app.execute(ElectronActions.Exit): Promise<void>;
```
