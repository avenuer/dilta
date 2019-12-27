import { Injectable } from '@dilta/core';
import {
  EntityNames,
  Synchronization,
  ReplicationError,
  ReplicationComplete,
  ReplicationEvents,
  ReplicationState
} from '@dilta/shared';
import { Embededb } from '@dilta/embdb';
import { from, Observable, of } from 'rxjs';
import { map, exhaustMap, merge } from 'rxjs/operators';
import { RxCollection, SyncOptions, RxReplicationState } from 'rxdb';
import { format } from 'date-fns';
import { EmbeddedRxDBError } from './errors';
import { EventEmitter } from 'events';

const REMOTE_DATABASE = process.env.REMOTE_DATABASE;

const { Upload, Download, Both } = Synchronization;
const modelKeys: EntityNames[] = Object.keys(EntityNames).map(k => EntityNames[k]);

export interface ReplicationStreamState {
  state: RxReplicationState;
  collection: EntityNames;
}

@Injectable()
export class DatabaseSyncService extends EventEmitter {
  constructor(public database: Promise<Embededb>) {
    super();
    // register Events
    this.on(ReplicationEvents.Start, this.startSync);
  }

  startSync(direction: Synchronization = Both) {
    const { Complete } = ReplicationState;
    from(this.database)
      .pipe(
        exhaustMap(db => from(this.collectionReplicationStates(direction)(db))),
        exhaustMap(stream => this.collateReplicationStreams(stream))
      )
      .subscribe(replication => {
        const event =
          replication.State === Complete
            ? ReplicationEvents.Complete
            : ReplicationEvents.Error;
        this.emit(event, replication);
      });
  }

  collectionReplicationStates(direction: Synchronization) {
    return (db: Embededb) => {
      return Promise.all(
        modelKeys.map(async key => {
          const collection = db[key];
          // conditional remote configuration
          const replicationState = collection.sync({
            ...this.directionConfig(direction, key),
            query: await this.keysReplicationConfig(collection, key)
          });
          return {
            collection: key,
            state: replicationState
          } as ReplicationStreamState;
        })
      );
    };
  }

  collateReplicationStreams(replications: ReplicationStreamState[]) {
    const stream: Observable<ReplicationError | ReplicationComplete> = of();
    replications.forEach(state => {
      stream.pipe(
        merge(
          this.cleanedDeniedState(state),
          this.cleanedErrorState(state),
          this.cleanedCompleteState(state)
        )
      );
    });
    return stream;
  }

  /**
   * query for documents that should be synchronized
   *
   * @param {RxCollection<any>} collection
   * @param {EntityNames} key
   * @returns
   * @memberof ElectronService
   */
  async keysReplicationConfig(collection: RxCollection<any>, key: EntityNames) {
    return collection.find({});
  }

  /**
   * direction configuration of object to be synchronized
   *
   * @param {Synchronization} direction
   * @returns {SyncOptions}
   * @memberof ElectronService
   */
  directionConfig(direction: Synchronization, key: EntityNames): SyncOptions {
    return {
      remote: `${REMOTE_DATABASE}/${key}`,
      direction: {
        pull: direction === Download || direction === Both,
        push: direction === Upload || direction === Both
      }
    };
  }

  /**
   * converts the replication deniedErrors to ReplicationError error type
   *
   * @param {ReplicationStreamState} { collection, state }
   * @returns
   * @memberof ElectronService
   */
  cleanedDeniedState({ collection, state }: ReplicationStreamState) {
    return state.denied$.pipe(
      map(doc => {
        return {
          collection,
          State: ReplicationState.Denied,
          error: new Error(
            `${collection} ${ReplicationState.Denied} ${doc.id}`
          ),
          time: format(Date.now(), 'x')
        } as ReplicationError;
      })
    );
  }

  /**
   * converts the replication errors to ReplicationError error type
   *
   * @param {ReplicationStreamState} { collection, state }
   * @returns
   * @memberof ElectronService
   */
  cleanedErrorState({ collection, state }: ReplicationStreamState) {
    return state.error$.pipe(
      map(streamError => {
        const error = new EmbeddedRxDBError(streamError);
        return {
          collection,
          State: ReplicationState.Denied,
          error: new Error(
            `${collection} ${ReplicationState.Error} ${error.message}`
          ),
          time: format(Date.now(), 'x')
        } as ReplicationError;
      })
    );
  }

  /**
   * maps successfull complete sync to ReplicationComplete state
   *
   * @param {ReplicationStreamState} { collection, state }
   * @returns
   * @memberof ElectronService
   */
  cleanedCompleteState({ collection, state }: ReplicationStreamState) {
    return state.complete$.pipe(
      map(done => {
        return {
          collection,
          State: done ? ReplicationState.Complete : ReplicationState.Incomplete,
          time: format(Date.now(), 'x')
        } as ReplicationComplete;
      })
    );
  }
}
