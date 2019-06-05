import { NgModule } from '@angular/core';
import { WebTransportService } from './services/web-transport.service';
import { HttpClientModule } from '@angular/common/http';
import { AbstractTransportService } from './abstract/transport.service';

@NgModule({
  imports: [HttpClientModule],
  exports: [HttpClientModule],
  providers: [
    { provide: AbstractTransportService, useClass: WebTransportService }
  ]
})
export class WebTransportModule {}
