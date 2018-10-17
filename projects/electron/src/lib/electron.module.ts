import { NgModule } from '@angular/core';
import { TransportService } from './electron.service';
import { NgxElectronModule } from 'ngx-electron';

@NgModule({
  imports: [ NgxElectronModule ],
  providers: [TransportService]
})
export class ElectronTransportModule { }
