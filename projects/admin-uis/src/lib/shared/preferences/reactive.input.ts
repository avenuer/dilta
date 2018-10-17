import { EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * Manages A Single ReactivePreferenceBase
 *
 * @export
 * @class ReactivePreferenceBase
 * @implements {OnInit}
 */
export class ReactivePreferenceBase implements OnInit {
  @Input() entries: [string, string]; // [key, value]
  /**
   * The Keys is editable else false
   *
   * @memberof ReactivePreferenceBase
   */
  @Input() keyEditable = false;

  /**
   * If the field deletes the key from the list
   *
   * @memberof ReactivePreferenceBase
   */
  @Input() deleteTable = false;

  /**
   * event emitter
   *
   * @memberof ReactivePreferenceBase
   */
  @Output() emitter = new EventEmitter();

  /**
   *Creates an instance of ReactivePreferenceBase.
   * @param {FormBuilder} fb
   * @memberof ReactivePreferenceBase
   */
  constructor() {}

  /**
   * Updates emits the value to the base component
   *
   * @param {ReactivePreferenceBaseInput<any>} value
   * @memberof ReactivePreferenceBase
   */
  update<T>($event: Event) {
    const _obj = {};
    const [key] = this.entries;
    const value = ($event.srcElement as HTMLInputElement).value;
    this.entries[1] = value;
    _obj[key] = value;
    this.emitter.emit(_obj);
  }

  ngOnInit() {}
}
