import { EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReactivePreferenceBaseInput } from './shared';

/**
 * Base class for as select and add input list form
 *
 * @export
 * @class ReactiveSelectPreferenceListBase
 * @extends {PreferenceListCommonOperations}
 */
export class ReactiveSelectPreferenceListBase {
  @Input() options: string[] = [];
  @Input() continous = false;

  @Output() emitter = new EventEmitter();

  /**
   * Observable of options selected
   *
   * @type {BehaviorSubject<string[]>}
   * @memberof ReactiveSelectPreferenceListBase
   */
  listInputs = new BehaviorSubject<ReactivePreferenceBaseInput<any>[]>([]);

  constructor() {}

  changedValue($event: Event, key: string) {
    let currentValue = this.listInputs.getValue();
    const isChecked = ($event.srcElement as HTMLInputElement).checked;
    currentValue = isChecked
      ? this.addNewValues(currentValue, key)
      : this.removeOldValues(currentValue, key);
    this.listInputs.next(currentValue);
  }

  /**
   * adds new select options to the input list
   *
   * @param {ReactivePreferenceBaseInput<any>[]} values
   * @param {string} key
   * @returns
   * @memberof ReactiveSelectPreferenceListBase
   */
  addNewValues(values: ReactivePreferenceBaseInput<any>[], key: string) {
    const obj = {};
    obj[key] = '';
    values.push(obj);
    return values;
  }

  /**
   * Emit to the parent component
   *
   * @param {Event} event
   * @memberof ReactiveSelectPreferenceListBase
   */
  emitToParent(event: Event) {
    console.log(event);
  }

  /**
   * removes old options from the input list
   *
   * @param {ReactivePreferenceBaseInput<any>[]} values
   * @param {string} key
   * @returns
   * @memberof ReactiveSelectPreferenceListBase
   */
  removeOldValues(values: ReactivePreferenceBaseInput<any>[], key: string) {
    return values.filter(e => Object.keys(e).indexOf(key) < 0);
  }
}
