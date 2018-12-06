import { AppComponent } from './app.component';
import { DiltaAppRoutingModule } from './dilta.routing';
import { environment } from '../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AcademicPageModule } from '@dilta/academic-ui';
import { AuthPagesModule } from '@dilta/client-auth';
import { MaterialModule } from '@dilta/client-shared';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    NoopAnimationsModule,
    SnotifyModule.forRoot(),
    RouterModule.forRoot([]),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production
    ? StoreDevtoolsModule.instrument({
        name: 'Dilta Application Store'
      })
    : [],
    DiltaAppRoutingModule,
    AuthPagesModule,
    AcademicPageModule,
  ],
  providers: [SnotifyService, { provide: 'SnotifyToastConfig', useValue: ToastDefaults }],
  bootstrap: [AppComponent]
})
export class AppModule { }
