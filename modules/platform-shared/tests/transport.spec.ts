import {
  successResponse,
  failureResponse,
  API_STATUS_CODE,
  API_STATUS_RESPONSE
} from '../transport';

describe('@dilta/shared', () => {
  describe('successResponse', () => {
    it('should return formated detailed object for succesfull Response', () => {
      const { data, reqId, time } = { data: [], reqId: 'randomId', time: 1000 };
      jest.spyOn(Date, 'now').mockReturnValue(time);
      expect(successResponse(reqId, data)).toEqual({
        reqId,
        data,
        time,
        code: API_STATUS_CODE.Success,
        status: API_STATUS_RESPONSE.Success
      });
    });
  });
  describe('failureResponse', () => {
    it('should return formated detailed object for failure Response with error object\'s message', () => {
      const {  reqId, time } = { reqId: 'randomId', time: 1000 };
      jest.spyOn(Date, 'now').mockReturnValue(time);
      const error = new Error(`error test`);
      expect(failureResponse(reqId, error)).toEqual({
        reqId,
        time,
        error: error.message,
        code: API_STATUS_CODE.Success,
        status: API_STATUS_RESPONSE.Success
      });
    });
    it('should return formated detailed object for failure Response with string message', () => {
      const {  reqId, time } = { reqId: 'randomId', time: 1000 };
      jest.spyOn(Date, 'now').mockReturnValue(time);
      const error = `error test`;
      expect(failureResponse(reqId, error)).toEqual({
        reqId,
        time,
        error: error,
        code: API_STATUS_CODE.Success,
        status: API_STATUS_RESPONSE.Success
      });
    });
  });
});
