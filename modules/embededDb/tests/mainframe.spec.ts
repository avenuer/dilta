import * as RxDB from 'rxdb';
import * as mainframe from '../setup.mainframe';

describe('@dilta/emdb', () => {
  describe('mainframe module', () => {
    it('should create and apply plugins and intialize kolls.', () => {
      const applyPluginSpy = jest.spyOn(mainframe, 'applyPlugins');
      const intializeKollSpy = jest.spyOn(mainframe, 'initalizeKolls');
      const rxdbSpy = jest.spyOn(RxDB, 'create');
      rxdbSpy.mockReturnValue({});
      applyPluginSpy.mockReturnThis();
      const DB_ADAPTER = 'db_adapter';
      mainframe.mainframe(DB_ADAPTER, {}, [], console);
      expect(applyPluginSpy).toHaveBeenCalledWith([], console);
      expect(rxdbSpy).toHaveBeenCalledWith({
        name: mainframe.DB_NAME,
        adapter: DB_ADAPTER,
        pouchSettings: {}
      });
      expect(intializeKollSpy).toHaveBeenCalledWith(
        {},
        mainframe.Kollections,
        console
      );
    });

    it('should throw error with invalid configuration while intializing a collection', () => {
      const db: any = {};
      expectAsync(
        mainframe.initalizeKolls(db, {} as any, console)
      ).toBeRejectedWith(mainframe.configsError);
      expectAsync(mainframe.initalizeKolls(db, [], console)).toBeRejectedWith(
        mainframe.configsError
      );
    });

    it('should add collection and its middlewares to the database', () => {
      const options = { preInsert: jest.fn() };
      const db: any = { collection: jest.fn(() => Object.assign(options)) };
      expectAsync(
        mainframe.initalizeKolls(
          db,
          [{ name: 'testKol', schema: {}, options }],
          console
        )
      ).toBeResolved();
    });

    it('should apply the rxdb plugins if it exists', () => {
      const rxPluginSpy = jest.spyOn(RxDB, 'plugin');
      mainframe.applyPlugins({} as any, console);
      expect(rxPluginSpy).not.toHaveBeenCalled();
      mainframe.applyPlugins([{}, {}], console);
      expect(rxPluginSpy).toHaveBeenCalledTimes(2);
    });
  });
});


