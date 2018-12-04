import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
  } from '@angular/core';
import { errorInvalid } from '@dilta/shared';
import { isEmpty } from 'lodash';
import * as math from 'mathjs';
import { BehaviorSubject } from 'rxjs';

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
  evaluated?: true;
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

export interface Map {
  key: KeysConfig;
  index: number;
}

@Component({
  selector: 'acada-dynamic-table',
  templateUrl: './dynamic-datgrid.component.html',
  styleUrls: ['./dynamic-datagrid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    <acada-dynamic-table> </acada-dynamic-table>`);

  /**
   * Throw mostly for numeric objects when the dont fall
   * between acceptable range of valid inputs
   *
   * @static
   * @memberof DynamicDataGridComponent
   */
  public static GridValueInputError = new Error(`inputed value exceed range
  allowed for column DynamicDataGridComponent:
  <acada-dynamic-table> </acada-dynamic-table>`);


  /**
   * expected keys and how they are to be displayed
   * @example [{ key: 'name', editable: false, type: string }]
   *
   * @type {KeysConfig[]}
   * @memberof DynamicDataGridComponent
   */
  @Input()
  public keys: KeysConfig[] = [];

  /**
   * array of data expected to be displayed under keys
   * provided
   *
   * @memberof DynamicDataGridComponent
   */
  @Input()
  public datagrid = [];


  /**
   * mathematical expression to be evalutade for calculaions
   *
   * @private
   * @type {MathExp}
   * @memberof DynamicDataGridComponent
   */
  @Input()
  public mathExp: MathExp;

  /**
   * bindable emitter that emits events and corresponding data on change event
   *
   * @type {number}
   * @memberof DynamicDataGridComponent
   */
  @Output()
  public sender = new EventEmitter();

  /**
   * bindable emitter that emits events and corresponding data on change event
   *
   * @type {number}
   * @memberof DynamicDataGridComponent
   */
  @Output()
  public changedData = new EventEmitter();

  constructor() {}

  /**
   * serves as a factory to emit if send is required
   * or edits if the key is enabled when double clicked from
   * view.
   *
   * @memberof DynamicDataGridComponent
   */
  activate(map: Map, data: any) {
    if (map.key.send) {
      this.sender.emit(data);
      return;
    }
    if (!map.key.editable) {
      return;
    }
    this.activateInput(map, data);
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
  activateInput({ index, key }: Map, data: any) {
    const input_id = key.key + '_' + index + 'input';
    if (key.editable) {
      const elem: HTMLInputElement = document.getElementById(input_id) as any;
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
  edited<T>($event: Event, map: Map) {
    try {
      const elem = $event.srcElement as HTMLInputElement;
      document.getElementById(map.key.key + '_' + map.index + 'input').hidden = true;
      this.datagrid[map.index] = this.updateGrid(
        this.datagrid[map.index],
        map,
        elem.value
      );
      this.changedData.emit({ data: this.datagrid[map.index], index: map.index });
    } catch (error) {
      this.errorHandler(map, (error as Error).message);
    }
  }

  /**
   * checking if the value is within the acceptable range
   *
   * @memberof DynamicDataGridComponent
   */
  validateKeyInput(input: number, { key }: Map) {
    const value = Math.floor(input);
    console.log('called', key.type, key.config);
    if (key.type === 'number' && key.config) {
      console.log(value > key.config.max, key.config.min > value, value > key.config.max || key.config.min > value);
      if (value > key.config.max || key.config.min > value) {
        throw DynamicDataGridComponent.GridValueInputError;
      }
    }
  }

  /**
   * updates the grid by calculating, validating and emitting
   * corresponding events
   *
   * @memberof DynamicDataGridComponent
   */
  updateGrid<T>(item: T, map: Map, value: string) {
    let updateditem = this.updateItem(map, item, value);
    if (this.mathExp) {
      updateditem = this.evalExpress(item, updateditem, map);
    }
    return updateditem;
  }

  /**
   * updates the grid cell and returns the update grid input
   *
   * @memberof DynamicDataGridComponent
   */
  updateItem<T>({ key, index }: Map, item: T, value: string) {
    let newValue = { ...(item as any) };
    newValue[key.key] = value;
    if (key.type === 'number') {
      newValue = this.mathEval({ key, index }, value, newValue);
    }
    return newValue;
  }

  /**
   * evaluates mathematical expressions and handles
   * error also showing a temporary span element containing
   * the error
   *
   * @memberof DynamicDataGridComponent
   */
  mathEval<T>(map: Map, preValue: T, value: T) {
    try {
      if (value[map.key.key] === '') {
        throw DynamicDataGridComponent.GridValueInputError;
      }
      value[map.key.key] = math.eval(value[map.key.key]);
    } catch (error) {
      this.errorHandler(map, (error as Error).message);
      value = preValue;
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
  evalExpress<T>(previous: T, updated: T,  map: Map): T {
    try {
      this.keys.forEach(key => {
        if (key.evaluated) {
          updated[key.key] = math.eval(this.mathExp, updated);
        }
      });
      this.validateKeyInput(updated[map.key.key], map);
      return updated;
    } catch (error) {
      console.log(map);
      this.errorHandler(map, (error as Error).message);
      return previous;
    }
  }

  /**
   * displays error in an hidden span element
   * made visible and error text appended to it;
   *
   * @memberof DynamicDataGridComponent
   */
  errorHandler({ key, index }: Map, mgs: string) {
    const error_id = key.key + '_' + index + 'error';
    console.log(error_id);
    const elem: HTMLSpanElement = document.getElementById(error_id);
    elem.innerText = mgs;
    elem.hidden = false;
    setTimeout(() => {
      elem.hidden = true;
    }, 2000);
  }

  get displayedColumns() {
    return this.keys.map(e => e.key);
  }

  /**
   * Checks and validate the keys and throw corresponding
   * errors
   *
   * @memberof DynamicDataGridComponent
   */
  ngOnInit() {
    errorInvalid(!isEmpty(this.keys), DynamicDataGridComponent.EmptyKeysError);
  }

  mapValue({ index, key }: Map) {
    return this.datagrid[index][key.key];
  }

  ngOnDestroy() {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.changedData.unsubscribe();
    this.sender.unsubscribe();
  }
}
