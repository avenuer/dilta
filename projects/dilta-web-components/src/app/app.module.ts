import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { academicSharedComponents, AcademicSharedUiModule } from '@dilta/academic-ui';
import { kebabCase } from 'lodash';

const entryComponents = [...academicSharedComponents];
@NgModule({
  declarations: [],
  imports: [BrowserModule, AcademicSharedUiModule],
  providers: [],
  entryComponents
})
export class AppModule {
  constructor(private inj: Injector) {}

  ngDoBootstrap() {
    entryComponents.forEach((element) => {
      const eleName = kebabCase(element.name.replace('Component', ''));
      const el = createCustomElement(element, { injector: this.inj });
      console.log(eleName);
      customElements.define(eleName, el);
    });
  }
}
