import { AppComponent } from './app.component';
import { DiltaAppRoutingModule } from './dilta.routing';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AcademicPageModule } from '@dilta/academic-ui';
import { MaterialModule } from '@dilta/client-shared';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    NoopAnimationsModule,
    // SnotifyModule.forRoot(),
    RouterModule.forRoot([]),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    DiltaAppRoutingModule,
    AcademicPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
