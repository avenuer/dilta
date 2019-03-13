export enum PlatformShared {
  ApplicationName = 'Marker'
}

/**
 * different school cat
 *
 * @export
 * @enum {number}
 */
export enum SchoolCategories {
  'Crech' = 'crech',
  'Nusery and Primary School' = 'Nusery and Primary School',
  'Secondary School' = 'Secondary School'
}

export enum Platform {
  Desktop = 'desktop',
  Server = 'server',
  Client = 'client'
}

/**
 * Types of settings configuration either school or user
 *
 * @export
 * @enum {number}
 */
export enum SettingTypes {
  school = 'school',
  user = 'user'
}

export enum DatabaseActions {
  Synchronization = 'Database [Synchronization]',
  GenerateData = 'Database [GenerateData]'
}

/**
 * clean Numeric enums by removing the Number values
 *
 * @export
 * @param {string[]} keys
 * @returns
 */
export function cleanNumericEnums(keys: string[]) {
  return keys.filter(k => !Number(k) && k !== '0');
}


/**
 * returns the key for any enum object
 *
 * @export
 * @template T Enum Object Interface
 * @param {T} enumObj
 * @param {string} enumValueType
 * @returns
 */
export function enumKeysToValue<T>(enumObj: T, enumValueType: string) {
  return (value: string | number, error: Error) => {
    let valueKey: string;
    value = enumValueType === 'number' ? Number(value) : value.toString();
    Object.keys(enumObj).forEach(key => {
      if (enumObj[key] === value) {
        valueKey = key;
      }
    });
    if (!valueKey) {
      throw error;
    }
    return valueKey;
  };
}
