import { bootStrap } from '@dilta/core';
import { SecurtityModule } from '@dilta/security';
import { start } from 'repl';

const program = bootStrap(SecurtityModule);

const repl = start('> ');
for (const key in program) {
  if (program.hasOwnProperty(key)) {
    repl.context[key] = program[key];
  }
}

// console.log(app);

// console.log('response', app.execute('[Security] Encrypt Liensce', { k: 'k' }));
