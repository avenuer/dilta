import { decryptLiensce } from './decrypt-prompts';
import { generateLiensce } from './encrypt-promts';

enum LiensceOperation {
  Generate = 'generate',
  Decrypt = 'decrypt'
}

export async function liensceOperation(inq) {
  const ans: any = await inq({
    name: 'operation',
    message: 'liensce operation type',
    type: 'list',
    choices: [LiensceOperation.Generate, LiensceOperation.Decrypt]
  });
  return ans['operation'] === LiensceOperation.Generate
    ? generateLiensce(inq)
    : decryptLiensce(inq);
}
