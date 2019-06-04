import { promisify } from 'util';
import { readFile } from 'fs';
import { join } from 'path';
import { LiensceGenerator } from 'modules/security/script/script_liensce';

export async function decryptLiensce(inq) {
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
