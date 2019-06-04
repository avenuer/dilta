import { NgModule } from '@angular/core';
import { AbstractTransportService } from './electron.service';
import { NgxElectronModule } from 'ngx-electron';

@NgModule({
  imports: [ NgxElectronModule ],
  providers: [AbstractTransportService]
})
export class ElectronTransportModule { }
