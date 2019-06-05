import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { createFeatureSelector, StoreModule } from '@ngrx/store';
import { SchoolEffect } from './school.effects';
import { schoolReducer, SchoolStore } from './school.reducer';


export const SchoolFeatureName = 'School';
export const schoolFeature = createFeatureSelector<SchoolStore>(SchoolFeatureName);

@NgModule({
  imports: [
    StoreModule.forFeature(SchoolFeatureName, schoolReducer),
    EffectsModule.forFeature([SchoolEffect]),
  ],
  exports: [],
  providers: []
})
export class SchoolFeatureNgrxModule {}
