import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LiensceKeyComponent } from './pages/LiensceKey';
import { SetupDoneComponent } from './pages/setup-done';
import { ProcessNgrxModule } from './process/process.module';
import { SetupRouterDirection } from './services/direction.service';
import { environment } from '../environments/environment';
import { ClassProvider, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SchoolPageModule, UserPageModule } from '@dilta/admin-uis';
import { AuthPagesModule } from '@dilta/client-auth';
import { ClientSharedModule, MaterialModule, RouterDirection, AcademicSettingModule } from '@dilta/client-shared';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { NgxUploaderModule } from 'ngx-uploader';


// custom route provider to match setup route directional mapping
const direction: ClassProvider = {
  provide: RouterDirection,
  useClass: SetupRouterDirection
};

@NgModule({
  declarations: [AppComponent, LiensceKeyComponent, SetupDoneComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxUploaderModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          name: 'Dilta Setup Store'
        })
      : [],
    FormsModule,
    ReactiveFormsModule,
    SnotifyModule.forRoot(),
    ClientSharedModule,
    AcademicSettingModule,
    ProcessNgrxModule,
    SchoolPageModule,
    AuthPagesModule,
    UserPageModule,
    AppRoutingModule
  ],
  providers: [direction, SnotifyService, { provide: 'SnotifyToastConfig', useValue: ToastDefaults }],
  bootstrap: [AppComponent]
})
export class AppModule {}
