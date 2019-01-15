import * as inquirer from 'inquirer';

import { promisify } from 'util';
import { readFile } from 'fs';
import { join } from 'path';
import { LiensceGenerator } from 'modules/security/script/script_liensce';

import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'fs';
import * as uuidRandom from 'uuid/v4';
import { addYears, format } from 'date-fns';
import { School } from 'modules/platform-shared/models';
import { schoolCategories } from 'modules/presets/schools.preset';
import { localGovts, states } from 'modules/presets/states.presets';
import { SchoolEncryptedData } from 'modules/platform-shared/security';
import { defaultPreInsert } from 'modules/embededDb/shared.model';

const DB_PATH = join(process.cwd(), 'database');
const DB_NAME = 'liensces.json';

const inq = inquirer.createPromptModule();
const seperator = new inquirer.Separator();

enum Commands {
  Liensce = 'liensce'
}

async function conversation() {
  try {
    const conv: any = await inq({
      name: 'operation',
      message: 'enter the Dilta Cli operation',
      type: 'list',
      choices: [Commands.Liensce]
    });
    switch (conv.operation) {
      case Commands.Liensce:
        return liensceOperation();
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
}

enum LiensceOperation {
  Generate = 'generate',
  Decrypt = 'decrypt'
}

async function liensceOperation() {
  const ans: any = await inq({
    name: 'operation',
    message: 'liensce operation type',
    type: 'list',
    choices: [LiensceOperation.Generate, LiensceOperation.Decrypt]
  });
  return ans['operation'] === LiensceOperation.Generate
    ? generateLiensce()
    : decryptLiensce();
}

async function decryptLiensce() {
  try {
    const ans: any = await inq({
      name: 'path',
      type: 'input',
      message: 'enter the path for the liensce key to decrypt'
    });
    const key = await promisify(readFile)(join(ans.path), 'utf8');
    console.log(LiensceGenerator.decryptLiensce(key));
  } catch (error) {
    console.error(error);
  }
}

async function generateLiensce() {
  const school: School = (await inq([
    {
      name: 'name',
      message: 'name of the school'
    },
    {
      name: 'email',
      message: 'school email'
    },
    {
      name: 'category',
      message: 'category of school',
      type: 'list',
      choices: schoolCategories
    },
    {
      name: 'description',
      message: 'description of school'
    },
    {
      name: 'address',
      message: 'address of school'
    },
    {
      name: 'town',
      message: 'LGA of the school',
      type: 'list',
      choices: localGovts()
    },
    {
      name: 'state',
      message: 'School state',
      type: 'list',
      choices: states()
    }
  ])) as any;
  school.id = uuidRandom();
  school.globalId = school.id;
  school.logo = '';
  encryptOrg(school);
}

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

export async function encryptOrg(org: School) {
  const newOrg = defaultPreInsert(org);
  const secretToken: SchoolEncryptedData = {
    apikey: uuidRandom(),
    expiretimestamp: format(addYears(Date.now(), 1), 'x') as any,
    school: newOrg
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

conversation();
