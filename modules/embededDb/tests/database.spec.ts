import * as electronDB from '../database';
import * as mainframe from '../setup.mainframe';

import { join } from 'path';

describe('@dilta/emdb', () => {
  describe('dbConfigFactory', () => {
    it('should set the adapter to leveldb for desktop', () => {
      const levelSpy = jest.fn;
      jest.doMock('leveldown', levelSpy);
      const result = electronDB.dbConfigFactory(true);
      expect(result.DB_ADAPTER).toBe(electronDB.DatabaseAdapters.LevelDown);
      expect(typeof result.options.db).toBe('function');
      result.options.db('test');
      expect(levelSpy).toHaveBeenCalledWith(
        join(electronDB.DATABASE_DIR, 'test')
      );
    });

    it('should set the adapter to http for others', () => {
      expect(electronDB.dbConfigFactory(false).DB_ADAPTER).toBe(
        electronDB.DatabaseAdapters.Http
      );
    });
  });

  describe('electronDatabase', () => {
    const configSpy = jest
      .spyOn(electronDB, 'electronDatabase')
      .mockReturnValue({
        options: {},
        DB_ADAPTER: electronDB.DatabaseAdapters.Http,
        rxDbPlugins: []
      } as electronDB.DatabaseConfig);

    it('should load the config and call the mainframe to intialize the database', () => {
      const mainframeSpy = jest
        .spyOn(mainframe, 'mainframe')
        .mockReturnValue({});
      expectAsync(electronDB.electronDatabase()).toBeResolvedTo({} as any);
      expect(configSpy).toHaveBeenCalled();
      expect(mainframeSpy).toHaveBeenCalled();
    });

    it('should exit process if error occurs during db intialization', () => {
      const error = new Error(`rejected error`);
      const exitSpy = jest.spyOn(process, 'exit').mockImplementation(jest.fn);
      jest.spyOn(mainframe, 'mainframe').mockRejectedValue(error);
      electronDB.electronDatabase();
      expect(exitSpy).toHaveBeenCalledWith(1);
    });
  });
});
