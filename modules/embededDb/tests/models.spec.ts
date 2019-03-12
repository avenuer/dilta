import { readdirSync } from 'fs';
import { join } from 'path';

const schemaRegex = new RegExp(`schema`, 'i');
const modelRegex = new RegExp(`model`, 'i');

const modelPaths = join(__dirname, '..', 'models');
const models = {};
readdirSync(modelPaths).forEach(path => module.require(join(modelPaths, path)));

describe('@dilta/emdb', () => {
  describe('models and schemas', () => {
    // The models of the application itself
    Object.keys(models).forEach(key => {
      const model = models[key];
      describe(`${key} config`, () => {
        it('should have a schema', () => {
          let failing = true;
          Object.keys(model)
            .filter(subKey => schemaRegex.test(subKey))
            .forEach(schemaKey => {
              failing = false;
              expect(model[schemaKey]).toBeDefined();
              expect(model[schemaKey].title).toBeDefined();
            });
        });

        it('should have a model valid for import', () => {
          let failing = true;
          Object.keys(model)
            .filter(subKey => modelRegex.test(subKey))
            .forEach(modelKey => {
              failing = false;
              expect(model[modelKey]).toBeDefined();
              expect(typeof model[modelKey].name === 'string').toBe(true);
              expect(typeof model[modelKey].schema === 'object').toBe(true);
            });
        });
      });
    });
  });
});

console.log(models);
// describe(``, () => {});
