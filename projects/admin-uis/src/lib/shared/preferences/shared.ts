export type ReactivePreferenceBaseInput<T> = { [p in keyof T]: string };

export interface ReactivePreferenceBaseInputViewMap {
  field: string;
  value: string;
}

export enum ItemListOperation {
  Delete = 'Delete'
}
