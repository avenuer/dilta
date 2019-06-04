console.log('sssssssssssssssss');

if (process.env.NODE_ENV === 'development') {
  require('env');
}

import { Injectable, Module, FactoryProvider } from '@dilta/core';
import { bootStrap } from '@dilta/core';
import { SecurtityModule } from '@dilta/security';
import { AcademicModules } from '@dilta/academics';
import { PresetModule } from 'modules/presets';
import { LiensceDatabase, TypeOrmToken } from './liensce-database';
import * as express from 'express';
import { createConnection } from 'typeorm';

/** Provider Token Mapping  */
export const typeOrmTokenProvider: FactoryProvider = {
  provide: TypeOrmToken,
  useFactory: () =>
    createConnection({
      type: process.env.SERVER_DB_TYPE as any,
      url: process.env.SERVER_DB_ADDRESS
    })
};

@Module({
  imports: [SecurtityModule, PresetModule, AcademicModules],
  providers: [typeOrmTokenProvider, LiensceDatabase]
})
@Injectable()
export class ServerModule {}

// bootstrapping application
const diltaApp = bootStrap(ServerModule);

const app = express();
app.get('/api/actions', async (req, res) => {
  const { args, action } = req.query;
  return await diltaApp.app.execute(action, args);
});
app.listen(process.env.PORT || 3000);
