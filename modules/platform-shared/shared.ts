export enum PlatformShared {
  ApplicationName = 'Marker'
}

export enum Platform {
  Desktop = 'desktop',
  Server = 'server',
  Client = 'client',
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
  GenerateData = 'Database [GenerateData]',
}

/**
 * clean Numeric enums by removing the Number values
 *
 * @export
 * @param {string[]} keys
 * @returns
 */
export function cleanNumericEnums(keys: string[]) {
  return keys.filter((k) => !Number(k) && k !== '0');
}

// Unpredictable behaviour
export function enumKeysToValue(keys: string[], enumValueType: string) {
  return (value: string | number) => {
    let valueKey;
    value = (enumValueType === 'number') ? Number(value) : value.toString();
    keys.forEach(key => {
      if (keys[key] === value) {
        valueKey = key;
      }
    });
    return valueKey;
  };
}
