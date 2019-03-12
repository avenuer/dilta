import * as shared from '../shared.model';
import * as uuid from 'uuid';
import { BaseModel } from '@dilta/shared';

describe('@dilta/emdb', () => {
  describe('shared schema model', () => {
    it('should have it schema object defined.', () => {
      expect(shared.baseModel.schema).toBeDefined();
    });
    it('should have it required array defined.', () => {
      expect(shared.baseModel.required).toBeDefined();
    });
  });

  describe('model pre-operations', () => {
    describe('generateBase', () => {
      it('should add the base details to the empty object', () => {
        const { time, id } = { time: 1000, id: 'id' };
        jest.spyOn(uuid as any, 'v4').mockReturnValue(id);
        const dateSpy = jest.spyOn(Date, 'now').mockReturnValue(time);
        expect(shared.generateBase({} as any)).toEqual({
          id,
          hash: `${time}::${id}`,
          createdAt: time,
          updatedAt: time
        } as BaseModel);
      });
      it('should maintain base object details while adding base details', () => {
        const { time, id, updatedAt } = {
          time: 1000,
          id: 'id',
          updatedAt: 2000
        };
        jest.spyOn(uuid as any, 'v4').mockReturnValue(id);
        const dateSpy = jest.spyOn(Date, 'now').mockReturnValue(updatedAt);
        const hash = 'randomhash';
        expect(
          shared.generateBase({
            id,
            hash,
            createdAt: time,
            updatedAt: time
          } as BaseModel)
        ).toEqual({
          id,
          hash,
          updatedAt,
          createdAt: time
        } as BaseModel);
      });
    });

    describe('updateBaseModel', () => {
      it('should update the base model', () => {
        const genSpy = jest.spyOn(shared, 'generateBase');
        const { hash, id } = { id: 'id', hash: 'randomhash' };
        genSpy.mockReturnValue({ hash });
        expect(shared.updateBaseModel({ id })).toEqual({ id, hash });
      });
    });

    describe('defaultPreInsert', () => {
      it('should add the base details to an new object', () => {
        const genMockValue: BaseModel = {
          id: 'id',
          hash: 'randomhash',
          createdAt: 1000,
          updatedAt: 2000
        };
        const genSpy = jest
          .spyOn(shared, 'generateBase')
          .mockReturnValue(genMockValue);
        expect(
          shared.defaultPreInsert({
            id: 'uid',
            hash: 'hash',
            createdAt: 1000,
            updatedAt: 2000
          } as BaseModel)
        ).toEqual(genMockValue);
      });
    });

    describe('defaultPreSave', () => {
      it('should not update the object with the base details', () => {
        const genMockValue: BaseModel = {
          id: 'id',
          hash: 'randomhash',
          createdAt: 1000,
          updatedAt: 2000
        };
        const genSpy = jest
          .spyOn(shared, 'generateBase')
          .mockReturnValue(genMockValue);
        const preSaveObject: BaseModel = {
          id: 'preid',
          hash: 'randomhashes',
          createdAt: 600,
          updatedAt: 1000
        };
        expect(shared.defaultPreSave(preSaveObject)).toEqual(preSaveObject);
      });
    });
  });
});
