import { DiltaApp } from '@dilta/core';
import {
  ApiFormat,
  failureResponse,
  successResponse,
  Transport
  } from '@dilta/shared';
import { Event, IpcMain } from 'electron';


/**
 * Listens and calls execution action and sends it back to the main process
 *
 * @export
 * @param {IpcMain} ipc
 */
export function ProcessIPCTransport(program: DiltaApp, ipc: IpcMain) {
  (global as any).program = program;
  const { app } = program;
  ipc.on(Transport.Request, async (event: Event, ctx: ApiFormat) => {
    app.logger.debug(
      {
        message: `[${ctx.action}] dispatched`,
        trace: 'ProcessIPCTransport',
        module: 'Electron Ipc'
      },
      ctx
    );
    try {
      const response = await app.execute.apply(app, [ctx.action, ...ctx.data]);
      event.sender.send(Transport.Response, successResponse(ctx.id, response));
    } catch (error) {
      app.logger.error(
        {
          message: `[${ctx.action}] failed`,
          trace: 'ProcessIPCTransport',
          module: 'Electron Ipc'
        },
        error
      );
      event.sender.send(Transport.Response, failureResponse(ctx.id, error));
    }
  });
}
