import { Logger, logError, LogPath, fileStream } from '..';

describe('Util-Module', () => {
  it('file logger path should equal expected path', () => {
    expect(fileStream.path).toMatch(LogPath);
  });

  describe('Logger Class', () => {
    it('should instantiate successfully', () => {
      const logger = new Logger();
      expect(logger.logger).toBeDefined();
    });

    it('should throw error if invalid customLog', () => {
      const logger = new Logger();
      const spy = jest.spyOn(logger, 'validate');
      [undefined, 0, { message: 0 }, { trace: 0 }, () => {}].forEach(val => {
        logger.validate(val);
        expect(spy).toThrowError(logError.message);
      });
    });

    it('should scope the module in various hierarchy', () => {
      const logger = new Logger();
      const innerScopeSpy = jest.spyOn(logger.logger, 'scope' as any);
      const validateSpy = jest.spyOn(logger, 'validate');
      logger.scope({  });
      expect(validateSpy).toHaveBeenCalled();
      logger.scope({ module: 'x' } as any);
      expect(validateSpy).toHaveBeenCalled();
    });

    it('should format log to array called by call', () => {
      const logger = new Logger();
      const timeSpy = jest.spyOn(logger, 'currentTime' as any);
      timeSpy.mockReturnValue(1000);
      expect(logger.format({ message: 'mgs' }, [])).toBe([1000, 'mgs']);
    });
  });
});
