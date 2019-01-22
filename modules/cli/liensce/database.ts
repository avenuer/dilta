import { join } from 'path';
import { LiensceGenerator } from 'modules/security/script/script_liensce';
import * as uuidRandom from 'uuid/v4';
import { School } from 'modules/platform-shared/models';
import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'fs';
import { addYears, format } from 'date-fns';
import { SchoolEncryptedData } from 'modules/platform-shared/security';
import { defaultPreInsert } from 'modules/embededDb/shared.model';
import { Boque } from 'modules/platform-shared/pricing/interface';

const DB_PATH = join(process.cwd(), 'database');
const DB_NAME = 'liensces.json';

function readDB(): SchoolEncryptedData[] {
  if (existsSync(join(DB_PATH, DB_NAME))) {
    return JSON.parse(readFileSync(join(DB_PATH, DB_NAME), 'utf8'));
  }
  writeDB([]);
  return readDB();
}

function writeDB(db: SchoolEncryptedData[]) {
  if (!existsSync(join(DB_PATH))) {
    mkdirSync(DB_PATH);
  }
  writeFileSync(join(DB_PATH, DB_NAME), JSON.stringify(db), 'utf8');
}

function saveSchool(org: SchoolEncryptedData) {
  const db = readDB();
  db.push(org);
  writeDB(db);
}

export async function encryptOrg(boque: Boque, org: School) {
  const newOrg = defaultPreInsert(org);
  const secretToken: SchoolEncryptedData = {
    apikey: uuidRandom(),
    expiretimestamp: format(addYears(Date.now(), 1), 'x') as any,
    school: newOrg,
    boque
  };
  const key = LiensceGenerator.encryptLiensce(secretToken);
  if (!existsSync(join(DB_PATH))) {
    mkdirSync(join(DB_PATH));
  }
  writeFileSync(
    join(DB_PATH, `${newOrg.name}-${newOrg.createdAt}.drsk`),
    key,
    'utf8'
  );
  saveSchool(secretToken);
}
