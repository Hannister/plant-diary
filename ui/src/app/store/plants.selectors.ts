import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPlantsState } from '../interfaces and enums/plants.model';

export const selectPlantsState = createFeatureSelector<IPlantsState>('plants');
export const selectPlants = createSelector(
  selectPlantsState,
  (state) => state.plants
);
export const selectPlantsIsLoading = createSelector(
  selectPlantsState,
  (state) => state.isLoading
);
