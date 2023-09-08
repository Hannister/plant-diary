import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { plantsReducer } from './plants.reducers';
import { PlantsEffects } from './plants.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('plants', plantsReducer),
    EffectsModule.forFeature([PlantsEffects]),
  ],
})
export class PlantsStoreModule {}
