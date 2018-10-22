import { ActionProviderMap } from './methods';
import { Injectable, ReflectiveInjector } from 'injection-js';
import { Logger } from 'modules/util/logger.service';
import 'reflect-metadata';

/**
 * Dummy Class to instantiate default behaviours
 *
 * @export
 * @class DiltaStarter
 */
@Injectable()
export class DiltaService {
  constructor() {}
}


/**
 * Setups up various coonfig level configurations
 *
 * @export
 * @class EventContext
 */
export class EventContext {
  constructor(
    private injector: ReflectiveInjector,
    public actions: Map<string, ActionProviderMap>,
  ) {}

  get logger(): Logger {
    return this.injector.get(Logger);
  }


  /**
   * Executes the function that has the action mapping
   *
   * @param {string} action
   * @param {*} ctx
   * @returns
   * @memberof EventContext
   */
  async execute(action: string, ...args) {
    const locMap = this.actions.get(action);
    const provider = this.injector.get(locMap.token);
    return await (provider[locMap.key] as Function).apply(provider, args);
  }
}
