import { isArray  } from 'lodash';

/**
 * sets a default value for the object keys
 * @param object the object which keys is to be defaulted
 * @param keys array of string keys that should be null
 */
export function defaultKeys(object: object, keys: string[], value?: any): any {
  const holder = {};
  keys.forEach(e => {
    if (!object[e]) {
      holder[e] = value || null;
    }
  });
  return Object.assign({}, object, holder);
}

/**
 * confirm object keys are valid if not throw error
 * @param object the object that is value should be required
 * @param keys an array of strings to confirm
 * @param origin a string that reference object origin i.e ICotor:myMethod:Comp
 */
export function confirmRequiredKeys(
  object: object,
  keys: string[],
  origin: string
) {
  for (const key of keys) {
    if (!object[key]) {
      throw new Error(`this ${key} is required for ${origin} `);
    }
  }
}

/**
 * throws error if the value passed is invalid
 * @param value checks if the value in not falsely or undefined or null
 * @param error error to be thrown if invalid
 */
export function errorInvalid(value: object | boolean, error: Error) {
  if (value === false) {
    throw error;
  }
  if (!value && typeof value !== 'boolean') {
    throw error;
  }
}

/**
 * throws the error provided if the value is not of type object
 * @param value value to check for error
 * @param error error to be thrown
 */
export function errorNotAndObject(value: object, error: Error) {
  if (typeof value !== 'object') {
    throw error;
  }
}

/**
 * gets the key require id the property passed is undefined or key
 * required it returns null or defaultValue or the value if it exists
 * @param value object whose key is to be selected
 * @param key sting path for object to get
 * @param defValue a default value to replace if key is not found
 */
export function getProp(value: object, key: string, defValue = null) {
  return value && value[key] ? value[key] : defValue;
}

/**
 * takes a file an returns it promisifed base64 url
 *
 * @export reader
 * @param {File} file a valid file Object
 * @param {string} [method] the method on the reader to be call on the file object
 * @returns {Promise<string>} promisified base64 string
 */
export function reader(file: File, method?: string): Promise<string> {
  const fReader = new FileReader();
  return new Promise((resolve, reject) => {
    fReader.addEventListener(
      'load',
      function() {
        return resolve(fReader.result as string);
      },
      false
    );
    fReader.onerror = err => reject(err);
    if (file) {
      fReader[method ? method : 'readAsDataURL'](file);
    }
  });
}

// for old forms that depends on it
export const fileBase64 = reader;

/**
 * @constant ArrayError throughs an error if an array expected is
 * invalid
 */
export const ArrayError = new Error(`execpted a valid array for charts
so has to create a valid series or single data type`);

/**
 * checks if the array is a vaild type hence
 * throws an error
 *
 * @template T inner array data typr
 * @param {Array<T>} data the array to be checked
 */
export function errorInvalidArray<T>(data: Array<T>) {
  if (!isArray(data)) {
    throw ArrayError;
  }
}

/**
 * throws error and handles the error for async functions
 *
 * @param {Error} err the error object
 * @param {(err: Error) => {}} [handler] custom error handler before throwing error
 */
export function throwError(err: Error, handler?: (err: Error) => {}) {
  if (err) {
    if (typeof handler === 'function') {
      handler(err);
    }
    throw err;
  }
}
