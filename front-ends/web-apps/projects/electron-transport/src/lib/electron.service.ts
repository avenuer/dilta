import { Injectable } from '@angular/core';
import {
  ApiFormat,
  ApiResponse,
  Transport
  } from '@dilta/shared';
import { ElectronService } from 'ngx-electron';
import { AbstractTransportService } from 'projects/client-shared/src/lib/abstract/transport.service';

// const REQUEST_TIME_OUT = 2000;
const REQUEST_TIME_OUT = 200000;

@Injectable({
  providedIn: 'root'
})
export class ElectronTransportService extends AbstractTransportService {
  constructor(private electron: ElectronService) {
    super();
  }

  /**
   * sends the JSON query to the main process event
   *
   * @template ResponseType
   * @param {ApiFormat} ctx
   * @returns {Promise<ApiResponse<ResponseType>>}
   * @memberof AbstractTransportService
   */
  bus<ResponseType>(ctx: ApiFormat): Promise<ApiResponse<ResponseType>> {
    this.electron.ipcRenderer.send(Transport.Request, ctx);
    console.log({ctx});
    return new Promise((resolve, rejects) => {
      this.electron.ipcRenderer.on(
        Transport.Response,
        (event: Event, response: ApiResponse<ResponseType>) => {
          if (response.reqId === ctx.id) {
            console.log({response});
            return resolve(response);
          }
        }
      );
      setTimeout(() => rejects(this.timeoutError(ctx)), REQUEST_TIME_OUT - 200);
    });
  }

}
