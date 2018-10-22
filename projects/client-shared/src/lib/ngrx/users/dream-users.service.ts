import { Injectable } from '@angular/core';
import { Model } from '@dilta/abstract-imp';
import { User } from '@dilta/models';
import { UtilService } from '@dilta/util';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { createUser, deleteUser, findUsers, getUser, updateUser } from './dream-users.query';

/**
 * responsible for the users [ teachers ] database operations
 *
 * @export
 * @class UserDBService
 */
@Injectable()
export class DreamUserService implements Model<User> {
  constructor(private apollo: Apollo, private util: UtilService) {}

  retrieve$(id: string) {
    return this.apollo
      .query<User>(getUser(id))
      .pipe(map(this.util.cleanApolloQueryResponse));
  }

  find$(query: Partial<User>) {
    return this.apollo
      .query<User[]>(findUsers(query))
      .pipe(map(this.util.cleanApolloQueryResponse));
  }

  create$(update: Partial<User>) {
    return this.apollo
      .mutate<User>(createUser(update))
      .pipe(map(res => this.util.cleanApolloMutationResponse<User>(res)));
  }

  update$(update: Partial<User>) {
    return this.apollo
      .mutate<User>(updateUser(update.id, update))
      .pipe(map(res => this.util.cleanApolloMutationResponse<User>(res)));
  }

  delete$(id: string) {
    return this.apollo
      .mutate<boolean>(deleteUser(id))
      .pipe(map(this.util.cleanApolloMutationResponse));
  }
}
