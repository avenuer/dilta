// Window Title Screen
// export const LIENSCE_WINDOW_TITLE = `Dreamtack Setup`;

// IPCMAIN PROCESS EVENTS

// DATABASE
/** Event for requesting the DATABASE */
export const GET_DATABASE = '[EVENT][MAINFRAME]::[GET][DATABASE]';



// SCHOOLID KEY CONSTANTS
/** EVENT name for saving the school id */
export const SET_SCHOOL_ID = '[EVENT][MAINFRAME]::[SET][SCHOOLID]';
/** EVENT name for getting the school id from key tar*/
export const GET_SCHOOL_ID = '[EVENT][MAINFRAME]::[GET][SCHOOLID]';
/** EVENT name for deleting the liensce key from keytar*/
export const DELETE_SCHOOL_ID = '[EVENT][MAINFRAME]::[DEL][SCHOOLID]';

// IPCRENDER PROCESS EVENTS

// DATABASE RECIEVING EVENT
/** Event for recieving the databse on the front end */
export const RETRIEVED_DATABASE = '[EVENT][MAINFRAME]::[GET][DATABASE]';

// LIENSCE KEY CONSTANTS
/** EVENT name for receving the liensce key*/
export const RETRIEVED_LIENSCE_kEY = '[EVENT][MAINFRAME]::[RETRIEVED][LIENSCE]';
/** EVENT name for recieving saved the liensce key operation status*/
export const SAVED_LIENSCE_KEY = '[EVENT][MAINFRAME]::[SAVED][LIENSCE]';
/** EVENT name for receving deleted the liensce key operation status*/
export const DELETED_LIENSCE_KEY = '[EVENT][MAINFRAME]::[DELETED][LIENSCE]';
/** Event Channel name to verify and returns saved objectKey */
export const VERIFY_LIENSCE_KEY_FILE =
  '[EVENT][MAINFRAME]::[VERIFY][LIENSCE][KEY][FILE]';
/** Event Channel name to listen to the verified key file and response */
export const VERIFYED_LIENSCE_KEY_FILE =
  '[EVENT][MAINFRAME]::[VERIFY][LIENSCE][KEY][FILE]';

// SCHOOLID KEY CONSTANTS
/** EVENT name for receving the schoolid*/
export const RETRIEVED_SCHOOL_ID = '[EVENT][MAINFRAME]::[RETRIEVED][LIENSCE]';
/** EVENT name for recieving saved the schoolid operation status*/
export const SAVED_SCHOOL_ID = '[EVENT][MAINFRAME]::[SAVED][LIENSCE]';
/** EVENT name for receving deleted the schoolid operation status*/
export const DELETED_SCHOOL_ID = '[EVENT][MAINFRAME]::[DELETED][LIENSCE]';
