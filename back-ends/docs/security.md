##### Security Module  
This page contains various actions types and context data type required for the actions to be performed.  
``` typescript
import { LIENSCE_KEY, USER_AUTH, Auth, SchoolEncryptedData, AuthTokenUser } from '@dilta/shared'

/** login the user returning JWT **/
app.execute(USER_AUTH.Login, { username: 'my_username', password: 'password' }): Promise<AuthTokenUser>;

/** signup and return JWT **/
const userAuth: Partial<Auth> = { ... };
app.execute(USER_AUTH.Signup, userAuth): Promise<AuthTokenUser>;

/** verify the JWT_token **/
app.execute(USER_AUTH.Verify, token): Promise<AuthTokenUser>;

/** Encrypt School Details into a Liensce Key and returns a string **/
const school: SchoolEncryptedData = { ... };
app.execute(LIENSCE_KEY.Encrypt, school): Promise<string>;

/** Decrypt Liensce into school details returns a Promise<string> **/
app.execute(LIENSCE_KEY.Decrypt, 'liensce string token'): Promise<string>;

/** Retrieves the current liensce store in the application returns a Promise<string> **/
app.execute(LIENSCE_KEY.Retrieve): Promise<string>;

/** Saves the current liensce on the system and returns Promise<SchoolEncryptedData> **/
app.execute(LIENSCE_KEY.Update, liensceKey): Promise<SchoolEncryptedData>;

/** not implemented yet */
app.execute(LIENSCE_KEY.Delete): Promise<>;
```
