import { Provider, Injectable } from 'injection-js';
import { flatten, uniq } from 'lodash';


/**
 * Decorator Constantts
 *
 * @enum {number}
 */
enum DecoratorSymbols {
  Actions = '__actions',
  Module = '__module_resolved'
}

/** The Types that matches the object propery type to be applied  */
type ObjectName = string | number | symbol;

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

/** Default Action Symbol to retrive collates all actions on an object */
export const ActionSymbol = Symbol(DecoratorSymbols.Actions);

/**
 * Action dispatched to be matched to particular service
 *
 * @export
 * @param {string} name The name of the Action to be mapped
 * @param {boolean} [enabled=true] Enable the action
 * @returns
 */
export function Action(name: string, enabled = true) {
  return function(
    target: object,
    key: ObjectName,
    descriptor: PropertyDescriptor
  ) {
    const method: Function = descriptor.value;
    if (typeof method !== 'function') {
      throw functionDecoratorRequiredError;
    }
    if (target.hasOwnProperty(ActionSymbol)) {
      (target[ActionSymbol] as ActionFunction[]).push({
        name,
        method,
        enabled
      });
    } else {
      target[ActionSymbol] = [];
      (target[ActionSymbol] as ActionFunction[]).push({
        name,
        method,
        enabled
      });
    }
  };
}

/** error dispatched if decorator is not attached to a function */
const functionDecoratorRequiredError = new Error(
  `This decorator should be applied to a function has a target`
);


/**
 * Module Colation of Providers.
 *
 * @interface Module
 */
export interface Module {
  providers?: Provider[];
  imports?: any[];
}

export interface Module {
  _resolved?: Provider[];
}

export const moduleSymbol = Symbol(DecoratorSymbols.Module);

/**
 * Decorator to collates providers being organized.
 *
 * @param {Module} module
 * @returns
 */
export function Module(module: Module) {
  const providers = module.providers || [];
  let moduleProviders: Provider[] = [];
  if (module.imports) {
    moduleProviders = flatten(module.imports.map(e => e[moduleSymbol]));
  }
  return function(target: any) {
    const resolved = uniq([ ...moduleProviders, ...providers, target ]);
    Object.defineProperty(target, moduleSymbol, { value: resolved, writable: true });
  };
}
