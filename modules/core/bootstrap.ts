import { EventContext } from './custom';
import {
  ActionProviderMap,
  collateActions,
  collateProviders,
  createInjector
  } from './methods';
import { Provider, ReflectiveInjector } from 'injection-js';


export interface DiltaApp {
  injector: ReflectiveInjector;
  actions: Map<string, ActionProviderMap>;
  providers?: Map<string, Provider>;
  app: EventContext;
}

/**
 * bootstrap the application and trigger customized meta-operations on the objects
 *
 * @export
 * @param {*} baseModule
 * @returns {DiltaApp}
 */
export function bootStrap(baseModule: any): DiltaApp {
  const injector = createInjector(baseModule);
  const actions = collateActions(injector);
  const providers = collateProviders(injector);
  const app = new EventContext(injector, actions);
  return { actions, injector, providers, app };
}
