import { decryptLiensce } from './decrypt-prompts';
import { generateLiensce, liensceBoquePrompt } from './encrypt-promts';

enum LiensceOperation {
  Generate = 'generate',
  Decrypt = 'decrypt',
  Pricing = 'pricing'
}

export async function liensceOperation(inq) {
  const ans: any = await inq({
    name: 'operation',
    message: 'liensce operation type',
    type: 'list',
    choices: [
      LiensceOperation.Generate,
      LiensceOperation.Decrypt,
      LiensceOperation.Pricing
    ]
  });
  return subLoadOperation(inq, ans['operation']);
  // return ans['operation'] === LiensceOperation.Generate
  //   ? generateLiensce(inq)
  //   : decryptLiensce(inq);
}

function subLoadOperation(inq: any, operation: LiensceOperation) {
  const { Generate, Decrypt, Pricing } = LiensceOperation;
  switch (operation) {
    case Generate:
      return generateLiensce(inq);
    case Decrypt:
      return decryptLiensce(inq);
    case Pricing:
      return liensceBoquePrompt(inq);
    default:
      console.log(`--------------Invalid Operation Selected--------------`);
  }
}
