import 'reflect-metadata';
import { ReflectiveInjector, Provider } from 'injection-js';
import { moduleSymbol, ActionSymbol } from './decorators';
import { EventContext } from './custom';

/**
 * Creates and Resolve modules to create an injector
 *
 * @export
 * @param {*} baseModule
 * @returns
 */
export function createInjector(baseModule: any) {
  const providers: Provider[] = baseModule[moduleSymbol];
  return ReflectiveInjector.resolveAndCreate(providers);
}

/**
 * interface mapping each actions to its objects
 *
 * @export
 * @interface ActionObjectMap
 */
export interface ActionObjectMap {
  [key: string]: Function;
}

/**
 * Property Detail mapped to the Action decorator symbol
 *
 * @export
 * @interface ActionFunction
 */
export interface ActionFunction {
  name: string;
  method: Function;
  enabled?: boolean;
}

/**
 * Serve has location mapping for the event to be triggered
 *
 * @export
 * @interface ActionProviderMap
 */
export interface ActionProviderMap {
  key: string;
  token: Function;
}

/**
 * collates the object mapping it to event object mapper
 *
 * @param {ReflectiveInjector} injector
 */
export function collateActions(injector: ReflectiveInjector) {
  const globalMap = new Map<string, ActionProviderMap>();
  (injector as any)._providers.forEach(provider => {
    const token: Function = provider.key.token;
    const instance = injector.get(token);
    //  collates custom actions
    if (instance[ActionSymbol]) {
      (instance[ActionSymbol] as Map<string, string>).forEach((value, name) => {
        globalMap.set(name, { key: value, token });
      });
    }
    // collate models directly
    if (instance['collectionName']) {
      ['create$', 'delete$', 'find$', 'retrieve$', 'update$'].forEach(key => {
        globalMap.set(`[Model] ${instance['collectionName']} ${key}`, {
          token,
          key
        });
      });
    }
  });
  return globalMap;
}

/**
 * interface mapping the className to its providers
 *
 * @export
 * @interface ProviderObjects
 */
export interface ProviderObjects {
  [key: string]: Provider;
}

/**
 * collates the providers into a single object
 *
 * @export
 * @param {ReflectiveInjector} injector
 * @returns
 */
export function collateProviders(injector: ReflectiveInjector) {
  const providers = new Map<string, Provider>();
  (injector as any)._providers.forEach(provider => {
    const key = provider.key.token;
    const instance = injector.get(key);
    providers.set(key.name, instance);
  });
  return providers;
}

interface DiltaApp {
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
