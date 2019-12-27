import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AbstractTransportService } from './transport.service';
import { WebTransportService } from './web-transport.service';

@NgModule({
  imports: [HttpClientModule],
  exports: [HttpClientModule],
  providers: [
    { provide: AbstractTransportService, useClass: WebTransportService }
  ]
})
export class WebTransportModule {}
