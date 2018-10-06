import { Module, Injectable } from '@dilta/core';
import { Logger } from './logger.service';

@Module({
  providers: [Logger]
})
@Injectable()
export class UtilModule {
  constructor() {}
}
