import * as inquirer from 'inquirer';
import { liensceOperation } from './liensce/operation';

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
        return liensceOperation(inq);
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
}

conversation();
