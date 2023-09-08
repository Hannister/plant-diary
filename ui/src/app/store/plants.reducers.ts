import { Action, createReducer, on } from '@ngrx/store';
import * as fromPlants from './index';
import { IPlantsState } from '../interfaces and enums/plants.model';

export const initialPlantsState: IPlantsState = {
  plants: [],
  isLoading: true,
};

const reducer = createReducer<IPlantsState>(
  initialPlantsState,
  on(fromPlants.getPlants, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromPlants.getPlantsSuccess, (state, { plants }) => {
    return {
      ...state,
      isLoading: false,
      plants,
    };
  }),
  on(fromPlants.createPlant, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromPlants.createPlantSuccess, (state, { plant }) => {
    return {
      ...state,
      plants: [...state.plants, plant],
      isLoading: false,
    };
  }),
  on(fromPlants.updatePlant, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromPlants.updatePlantSuccess, (state, { plant }) => {
    return {
      ...state,
      plants: state.plants.map((b) => (b._id === plant._id ? plant : b)),
      isLoading: false,
    };
  }),
  on(fromPlants.deletePlant, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromPlants.deletePlantSuccess, (state, { plant }) => {
    return {
      ...state,
      isLoading: false,
      plants: state.plants.filter((b) => b._id !== plant._id),
    };
  })
);

export function plantsReducer(
  state = initialPlantsState,
  actions: Action
): IPlantsState {
  return reducer(state, actions);
}
