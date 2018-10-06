import { Injectable, ReflectiveInjector, Provider } from 'injection-js';
import { ActionProviderMap } from './methods';

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


  /**
   * Executes the function that has the action mapping
   *
   * @param {string} action
   * @param {*} ctx
   * @returns
   * @memberof EventContext
   */
  execute(action: string, ...args) {
    const locMap = this.actions.get(action);
    const provider = this.injector.get(locMap.token);
    return (provider[locMap.key] as Function).apply(provider, args);
  }
}
