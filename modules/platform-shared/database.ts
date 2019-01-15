import { EntityNames } from './models';

export enum ReplicationState {
  Denied = 'Denied',
  Error = 'Error',
  Complete = 'Complete',
  Incomplete = 'Incomplete'
}

export interface ReplicationError {
  time: number | string;
  collection: EntityNames;
  error: Error;
  State: ReplicationState.Denied | ReplicationState.Error;
}

export interface ReplicationComplete {
  time: number | string;
  collection: EntityNames;
  State: ReplicationState.Complete;
}

export enum ReplicationEvents {
  Error = 'Replication Events Error',
  Complete = 'Replication Events Complete',
  Start = 'Replication Events Start'
}
