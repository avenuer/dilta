import * as model from '../models';

describe('@dilta/shared', () => {
  describe('modelActionFormat', () => {
    it('should formats action for model operations', () => {
      expect(
        model.modelActionFormat(
          model.EntityNames.Auth,
          model.ModelOperations.Create
        )
      ).toEqual(
        `[Model] ${model.EntityNames.Auth} ${model.ModelOperations.Create}`
      );
    });
  });
});
