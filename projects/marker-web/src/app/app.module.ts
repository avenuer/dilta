import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { DownloadComponent } from './components/download/download.component';
import { FeaturesComponent } from './components/features/features.component';
import { OfflinePricingComponent } from './components/offline-pricing/offline-pricing.component';
import { OnlinePricingComponent } from './components/online-pricing/online-pricing.component';
import { WebFooterComponent } from './components/web-footer/web-footer.component';
import { WebToolBarComponent } from './components/web-tool-bar/web-tool-bar.component';
import { FeaturesPageComponent } from './pages/features-page/features-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { WebMaterialModule } from './web-material.module';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgtUniversalModule } from '@ng-toolkit/universal';


@NgModule({
   declarations: [
      AppComponent,
      WebToolBarComponent,
      AboutComponent,
      PricingComponent,
      DownloadComponent,
      FeaturesComponent,
      OfflinePricingComponent,
      OnlinePricingComponent,
      HomePageComponent,
      FeaturesPageComponent,
      WebFooterComponent
   ],
   imports: [
    NgtUniversalModule,
      NoopAnimationsModule,
      WebMaterialModule,
      AppRoutingModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
