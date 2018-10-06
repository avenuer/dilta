#### DatabaseModule

This module is responsible for crud operation of the application, dispatching various actions has been matched in a corresponding format.  
an Model action is formated as `[Model] collectionName operation`, collection Name matches to the the following entityNames and operations are `'create$', 'delete$', 'find$', 'retrieve$', 'update$'`.

following example on the Auth Model has example and note all operations are async in nature, meaning return promises.

```
import { EntityNames, Auth, FindQueryParam } from '@dilta/shared';

/** Create an new Auth **/
const auth: Partial<Auth> = { ... };
app.execute(`[Model] ${EntityNames.Auth} create$`, auth);

/** Query Auth has find query **/
const query: Partial<Auth> = {};
const findParams: Partial<FindQueryParam> = {};
app.execute(`[Model] ${EntityNames.Auth} find$`, query, findParams);

/** Retrieve an Auth  like findOne **/
const auth: Partial<Auth> = { id: 'randomId' };
app.execute(`[Model] ${EntityNames.Auth} retrieve$`, query);

/** Update and Auth information **/
app.execute(`[Model] ${EntityNames.Auth} update$`, id, auth);

/** Delete and Auth Information  **/
app.execute(`[Model] ${EntityNames.Auth} delete$`, query);
```
