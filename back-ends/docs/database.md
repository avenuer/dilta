#### DatabaseModule

This module is responsible for crud operation of the application, dispatching various actions has been matched in a corresponding format.  
an Model action is formated as `[Model] collectionName operation`, collection Name matches to the the following entityNames and operations are `'create$', 'delete$', 'find$', 'retrieve$', 'update$'`.

following example on the Auth Model has example and note all operations are async in nature, meaning return promises.

``` typescript
import { EntityNames, Auth, FindQueryParam, FindResponse, SearchFindRequest } from '@dilta/shared';

/** Understand Auth is represent a generic Type Here for example: */
type k<T> = T;
// therefore
type k<Auth> = Auth;
// replace the Auth with type of the EntityModel/

/** Create an new Auth **/
const auth: Partial<Auth> = { ... };
app.execute(`[Model] ${EntityNames.Auth} create$`, auth): Promise<Auth>;

/** Query Auth has find query  also automatically does a search if query is a string **/
const query: SearchFindRequest<T> = {};
// assume T = Auth so  const query: Parital<Auth> = {};
const findParams: Partial<FindQueryParam> = {};
app.execute(`[Model] ${EntityNames.Auth} find$`, query, findParams): Promise<FindResponse<Auth>>;
// can also be a string
app.execute(`[Model] ${EntityNames.Auth} find$`, 'search-query', findParams): Promise<FindResponse<Auth>>;

/** Retrieve an Auth  like findOne **/
const auth: Partial<Auth> = { id: 'randomId' };
app.execute(`[Model] ${EntityNames.Auth} retrieve$`, query): Promise<Auth>;

/** Update and Auth information **/
app.execute(`[Model] ${EntityNames.Auth} update$`, id, auth): Promise<Auth>;

/** Delete and Auth Information  **/
app.execute(`[Model] ${EntityNames.Auth} delete$`, query): Promise<boolean>;
```
