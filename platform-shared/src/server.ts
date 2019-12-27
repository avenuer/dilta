import { SchoolEncryptedBaseInfo } from './security';
import { School } from './models';
import { Boque } from './pricing';

export enum ServerActions {
  // action to generate ecrypted liensce
  GenerateEncryptedLiensce = '[Server] Service GenerateEncryptedLiensce',
  // action to generate ecrypted liensce
  GenerateEncryptedLienscePlusData = '[Server] Service GenerateEncryptedLienscePlusData',
  // action to retrive liensce details
  RetrieveLiensceDetails = '[Server] Service RetrieveLiensceDetails',
  // action to retrieve encrypted liensce
  RetrieveEncryptedLiensce = '[Server] Service RetrieveEncryptedLiensce'
}

export type SchoolEncryptedDBData = SchoolEncryptedBaseInfo & { school: School; boque: Boque };
export interface SchoolEncryptedDBDataPlusLiensce {
  data: SchoolEncryptedDBData;
  liensce: string;
}
