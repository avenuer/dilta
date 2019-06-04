import { Injectable } from '@angular/core';
import {
  ApiFormat,
  ApiResponse,
  } from '@dilta/shared';
import { AbstractTransportService } from 'projects/client-shared/src/lib/abstract/transport.service';
import { HttpClient } from '@angular/common/http';

// const REQUEST_TIME_OUT = 2000;
const REQUEST_TIME_OUT = 200000;

@Injectable({
  providedIn: 'root'
})
export class WebTransportService extends AbstractTransportService {
  constructor(private http: HttpClient) {
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
    return this.http.post<ApiResponse<ResponseType>>('/api/actions', ctx)
    .toPromise();
  }

}
