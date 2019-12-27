import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { WebTransportModule } from 'transport';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SnotifyModule.forRoot(),
    RouterModule.forRoot([]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([]),
    WebTransportModule,
    AppRoutingModule
  ],
  providers: [
    SnotifyService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
