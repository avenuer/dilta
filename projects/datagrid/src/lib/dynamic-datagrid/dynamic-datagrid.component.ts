import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { errorInvalid } from '@dilta/screwbox';
import { isEmpty } from 'lodash';
import * as math from 'mathjs';

/**
 * confiiguration of keys to display and allowed
 * ations on it
 *
 * @export
 * @interface KeysConfig
 */
export interface KeysConfig {
  key: string;
  title?: string;
  editable: boolean;
  type: string;
  send?: boolean; // used instead of changing used to send grid data out
  config?: {
    max: number;
    min: number;
    map?(currVal: number): string | number;
  };
  default?: string | number;
}

/**
 * configuration for mathematical expression
 * for columns configuration
 *
 * @export
 * @interface MathExp
 */
export type MathExp = string;

/**
 * event object emitted for updated values
 *
 * @export
 * @interface ChangeEvnt
 */
export interface ChangeEvnt {
  data: any; // the update object
  key: string; // the key to track changes
  tracker: string; // the unique object tracting id
}

export interface Map {
  x: number;
  y: number;
}

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-datgrid.component.html',
  styleUrls: ['./dynamic-datagrid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DynamicDataGridComponent implements OnInit, OnDestroy {
  /**
   * EmptyKeys is throw when an empty keylist is provided
   * by the user
   *
   * @static
   * @memberof DynamicDataGridComponent
   */
  public static EmptyKeysError = new Error(`empty keylists Input
    array provided for DynamicDataGridComponent:
    <app-dynamic-table> </app-dynamic-table>`);

  /**
   * Throw mostly for numeric objects when the dont fall
   * between acceptable range of valid inputs
   *
   * @static
   * @memberof DynamicDataGridComponent
   */
  public static GridValueInputError = new Error(`inputed value exceed range
  allowed for column DynamicDataGridComponent:
  <app-dynamic-table> </app-dynamic-table>`);

  /**
   * TrackerKeyError is throw when an empty unique key identifier
   * is not provided
   *
   * @static
   * @memberof DynamicDataGridComponent
   */
  public static TrackerKeyError = new Error(`empty tracker provided
    for Tracker Key Input DynamicDataGridComponent:
    <app-dynamic-table> </app-dynamic-table> `);

  /**
   * expected keys and how they are to be displayed
   * @example [{ key: 'name', editable: false, type: string }]
   *
   * @type {KeysConfig[]}
   * @memberof DynamicDataGridComponent
   */
  @Input() public keys: KeysConfig[] = [];

  /**
   * array of data expected to be displayed under keys
   * provided
   *
   * @memberof DynamicDataGridComponent
   */
  @Input() public datagrid = [];

  /**
   * the title or name that is discriptive of the data
   *
   * @memberof DynamicDataGridComponent
   */
  @Input() public title;

  /**
   * a unique key use to identify each data
   *
   * @private
   * @type {string}
   * @memberof DynamicDataGridComponent
   */
  @Input() public tracker: string;

  /**
   * mathematical expression to be evalutade for calculaions
   *
   * @private
   * @type {MathExp}
   * @memberof DynamicDataGridComponent
   */
  @Input() public mathExp: MathExp;

  /**
   * the width that the datagrid show extend to in pixels
   *
   * @type {number}
   * @memberof DynamicDataGridComponent
   */
  @Input() public width = '700';

  /**
   * the height that the datagrid show extend to in pixels
   *
   * @type {number}
   * @memberof DynamicDataGridComponent
   */
  @Input() public height = '600';

  /**
   * bindable emitter that emits events and corresponding data on change event
   *
   * @type {number}
   * @memberof DynamicDataGridComponent
   */
  @Output() public sender = new EventEmitter();

  /**
   * bindable emitter that emits events and corresponding data on change event
   *
   * @type {number}
   * @memberof DynamicDataGridComponent
   */
  @Output() public changedData = new EventEmitter();

  constructor() {}

  /**
   * serves as a factory to emit if send is required
   * or edits if the key is enabled when double clicked from
   * view.
   *
   * @param {Map} map positon x, y of the cell
   * @param {*} data mapped data from the grid
   * @param {string} key key of input clicked
   * @memberof DynamicDataGridComponent
   */
  activate(map: Map, data: any, key: string) {
    if (this.keys[map.x].send) {
      this.sender.emit({ data, key });
      return;
    }
    if (!this.keys[map.x].editable) {
      return;
    }
    this.activateInput(map, data, key);
  }

  /**
   * when the cell is double clicked it checks if it is
   * allowed to be editable else returns
   *
   * @param {Map} map positon x, y of the cell
   * @param {*} data mapped data from the grid
   * @param {string} key key of input clicked
   * @memberof DynamicDataGridComponent
   */
  activateInput(map: Map, data: any, key: string) {
    const { x, y } = map;
    if (this.keys[x].editable) {
      const elem: HTMLInputElement = document.getElementById(
        `${x.toString()}_${y.toString()}_${key}`
      ) as any;
      elem.hidden = false;
    }
  }

  /**
   * when the input element value changes sisplays an event
   * which corresponds and saves the input to the dislay
   *
   * @template T data grid item data type
   * @param {Event} $event event from double click mostly
   * @param {Map} map postion x, y of the cell grid
   * @param {string} key key of data object value to be changed
   * @param {T} data data object from the grid
   * @memberof DynamicDataGridComponent
   */
  edited<T>($event: Event, map: Map, key: string, data: T) {
    try {
      const elem = $event.srcElement as HTMLInputElement;
      this.validateKeyInput(elem, map, key);
      this.datagrid = this.datagrid.map(e => {
        if (e[this.tracker] === data[this.tracker]) {
          e = this.updateGrid(e, map, elem, key, data);
          elem.hidden = true;
        }
        return e;
      });
      elem.hidden = true;
    } catch (error) {
      this.errorHandler(map, `expect input value to be between valid range`);
    }
  }

  /**
   * checking if the value is within the acceptable range
   *
   * @param {HTMLInputElement} elem html input source
   * @param {Map} map map address to the cell
   * @param {string} key the key to be updated
   * @memberof DynamicDataGridComponent
   */
  validateKeyInput(elem: HTMLInputElement, map: Map, key: string) {
    const value = parseInt(elem.value, 10);
    this.keys.forEach(e => {
      if (e.key === key && e.type === 'number' && e.config) {
        if (value > e.config.max || e.config.min > value) {
          throw DynamicDataGridComponent.GridValueInputError;
        }
      }
    });
  }

  /**
   * updates the grid by calculating, validating and emitting
   * corresponding events
   *
   * @template T data grid item data type
   * @param {T} e  original item object
   * @param {Map} map location of the grid cell
   * @param {HTMLInputElement} elem input elem that updated the view
   * @param {string} key the object key to update
   * @param {T} data view grid object copy of e
   * @returns updated already emitted item
   * @memberof DynamicDataGridComponent
   */
  updateGrid<T>(e: T, map: Map, elem: HTMLInputElement, key: string, data: T) {
    e = this.updateItem(map, { elem, e, key }, data);
    if (this.mathExp) {
      e = this.evalExpress(e, map);
    }
    this.changedData.emit(<ChangeEvnt>{
      data: e,
      key,
      tracker: this.tracker
    });
    return e;
  }

  /**
   * updates the grid cell and returns the update grid input
   *
   * @template T generic type of data being passed
   * @param {Map} map location of grid cell
   * @param {{ elem: HTMLInputElement, e: T, key: string }} source object map containg source input,item,update key
   * @param {T} data grid view object
   * @returns updated item
   * @memberof DynamicDataGridComponent
   */
  updateItem<T>(
    map: Map,
    source: { elem: HTMLInputElement; e: T; key: string },
    data: T
  ) {
    const { elem, e, key } = source;
    const { x, y } = map;
    const value = elem.value;
    e[key] =
      this.keys[x].type === 'number'
        ? this.mathEval(value, e[key], map)
        : value;
    return e;
  }

  /**
   * evaluates mathematical expressions and handles
   * error also showing a temporary span element containing
   * the error
   *
   * @template T generic data type being passed mostly as prefered type
   * @param {string} value the value or expression to be evaluated
   * @param {T} preValue the intial value to be overiden
   * @param {Map} map the positon x, y of the cell grid
   * @returns a valid value
   * @memberof DynamicDataGridComponent
   */
  mathEval<T>(value: string, preValue: T, map: Map) {
    try {
      if (value === '') {
        throw DynamicDataGridComponent.GridValueInputError;
      }
      value = math.eval(value);
    } catch (error) {
      this.errorHandler(map, `invalid math expression`);
      value = (preValue as any) as string;
    }
    return value;
  }

  /**
   * evaluates mathematical expressions concerned with the object
   * and returns the object
   *
   * @template T passed datatype object type genric
   * @param {T} item object item which the provided expression should be expressed
   * @param {Map} map location of its grid cell
   * @returns {T} item evaluated object scope
   * @memberof DynamicDataGridComponent
   */
  evalExpress<T>(item: T, map: Map): T {
    try {
      math.eval(this.mathExp, item);
      return item;
    } catch (error) {
      this.errorHandler(map, `invalid math expression`);
    }
  }

  /**
   * displays error in an hidden span element
   * made visible and error text appended to it;
   *
   * @param {Map} map position x, y of cell
   * @param {string} mgs custom error message
   * @memberof DynamicDataGridComponent
   */
  errorHandler(map: Map, mgs: string) {
    const { x, y } = map;
    const elem: HTMLSpanElement = document.getElementById(
      `${x}_${y}_err`
    ) as any;
    elem.innerText = mgs;
    elem.hidden = false;
    elem.style.color = 'red';
    setTimeout(() => {
      elem.hidden = true;
    }, 2000);
  }

  /**
   * Checks and validate the keys and throw corresponding
   * errors
   *
   * @memberof DynamicDataGridComponent
   */
  ngOnInit() {
    errorInvalid(!isEmpty(this.keys), DynamicDataGridComponent.EmptyKeysError);
    errorInvalid(!!this.tracker, DynamicDataGridComponent.TrackerKeyError);
  }

  ngOnDestroy() {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.changedData.unsubscribe();
    this.sender.unsubscribe();
  }
}
