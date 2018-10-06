##### Security Module  
This page contains various actions types and context data type required for the actions to be performed.  
```
import { LIENSCE_KEY, USER_AUTH, Auth, SchoolEncryptedData } from '@dilta/shared'

/** login the user returning JWT **/
app.execute(USER_AUTH.Login, { username: 'my_username', password: 'password' });

/** signup and return JWT **/
const userAuth: Partial<Auth> = { ... };
app.execute(USER_AUTH.Signup, userAuth);

/** verify the JWT_token **/
app.execute(USER_AUTH.Verify, token);

/** Encrypt School Details into a Liensce Key and returns a string **/
const school: SchoolEncryptedData = { ... };
app.execute(LIENSCE_KEY.Encrypt, school);

/** Decrypt Liensce into school details returns a Promise<string> **/
app.execute(LIENSCE_KEY.Decrypt, 'liensce string token');

/** Retrieves the current liensce store in the application returns a Promise<string> **/
app.execute(LIENSCE_KEY.Retrieve);

/** Saves the current liensce on the system and returns Promise<SchoolEncryptedData> **/
app.execute(LIENSCE_KEY.Update, liensceKey);

/** not implemented yet */
app.execute(LIENSCE_KEY.Delete);
```
