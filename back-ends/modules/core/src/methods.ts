import { ActionSymbol, moduleSymbol } from './decorators';
import { modelActionFormat, ModelOperations } from '@dilta/shared';
import { Provider, ReflectiveInjector } from 'injection-js';

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
  // global map for action to functions
  const globalMap = new Map<string, ActionProviderMap>();
  // various model operations available
  const { Create, Delete, Find, Retrieve, Update} = ModelOperations;
  const modelOperations: ModelOperations[] = [Create, Delete, Find, Retrieve, Update];
  // loop through to collate actions and model actions
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
      modelOperations.forEach(key => {
        globalMap.set(modelActionFormat(instance['collectionName'], key), {
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
