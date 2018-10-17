import { EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactivePreferenceBaseInput } from './shared';

export class PreferenceListCommonOperations {
  /**
   * recieves input for the prefernceTemplateComponent
   *
   * @type {ReactivePreferenceListBase<any[]>}
   * @memberof ReactivePreferenceBase
   */
  @Input() public settings: ReactivePreferenceBaseInput<any>[] = [];

  constructor() {}

  /**
   * Add a new item to the list
   *
   * @memberof ReactivePreferenceListBase
   */
  addToList(name = 'name', value = 'value') {
    const _obj = {};
    _obj[name] = value;
    this.settings.push(_obj);
  }

  /**
   * removes the item with the index from the list
   *
   * @param {number} index
   * @memberof ReactivePreferenceListBase
   */
  removeFromList(index: number) {
    this.settings = this.settings.filter((v, i) => i !== index);
  }

  /**
   * Listenns for the event by updating or removing item
   *
   * @param {number} index
   * @param {(ReactivePreferenceBaseInput<any> )} value
   * @returns
   * @memberof ReactivePreferenceListBase
   */
  updateList(index: number, value: ReactivePreferenceBaseInput<any>) {
    this.settings[index] = value;
  }
}

/**
 * Manages A List ReactivePreferenceBase
 *
 * @export
 * @class ReactivePreferenceListBase
 * @implements {OnInit}
 */
export class ReactivePreferenceListBase extends PreferenceListCommonOperations
  implements OnInit {
  /**
   * Title of the form if availabe
   *
   * @memberof ReactivePreferenceListBase
   */
  @Input() title;

  /**
   * allows whether the key of inputs are editable
   *
   * @memberof ReactivePreferenceListBase
   */
  @Input() keyEditable = false;

  /**
   * determines if menu operations apply i.e adding and removing items
   *
   * @memberof ReactivePreferenceListBase
   */
  @Input() menuOperations = false;

  /**
   * determines if every input operation updates
   *
   * @memberof ReactivePreferenceListBase
   */
  @Input() continous = false;

  /**
   * emits values to the parent component
   *
   * @memberof ReactivePreferenceListBase
   */
  @Output() emitter = new EventEmitter();

  constructor() {
    super();
  }

  /**
   * Add a new item to the list
   *
   * @memberof ReactivePreferenceListBase
   */
  addToList() {
    super.addToList('name', 'value');
    this.emit(this.settings);
  }

  /**
   * removes the item with the index from the list
   *
   * @param {number} index
   * @memberof ReactivePreferenceListBase
   */
  removeFromList(index: number) {
    super.removeFromList(index);
    this.emit(this.settings);
  }

  /**
   * Listens for the event by updating or removing item
   *
   * @param {number} index
   * @param {(ReactivePreferenceBaseInput<any> | string)} value
   * @returns
   * @memberof ReactivePreferenceListBase
   */
  updateList(index: number, value: ReactivePreferenceBaseInput<any> | string) {
    if (typeof value === 'string') {
      this.removeFromList(index);
      return;
    }
    this.settings[index] = value;
    this.emit(this.settings);
  }

  emit(value) {
    this.emitter.emit(value);
  }

  ngOnInit() {}
}
