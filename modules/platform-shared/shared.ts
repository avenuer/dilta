export enum PlatformShared {
  ApplicationName = 'Dilta'
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
  Synchronization = 'Database [Synchronization]'
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
