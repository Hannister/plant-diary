import { createAction, props } from '@ngrx/store';
import { IPlant } from '../interfaces and enums/plant';

const prefix = '[Plants]';

export const getPlants = createAction(`${prefix} Get Plants`);
export const getPlantsSuccess = createAction(
  `${getPlants.type} Success`,
  props<{
    plants: IPlant[];
  }>()
);

export const createPlant = createAction(
  `${prefix} Create Plant`,
  props<{
    plant: IPlant;
  }>()
);

export const createPlantSuccess = createAction(
  `${createPlant.type} Success`,
  props<{
    plant: IPlant;
  }>()
);

export const updatePlant = createAction(
  `${prefix} Update Plant`,
  props<{
    plant: IPlant;
  }>()
);

export const updatePlantSuccess = createAction(
  `${updatePlant.type} Success`,
  props<{
    plant: IPlant;
  }>()
);

export const deletePlant = createAction(
  `${prefix} Delete Plant`,
  props<{
    plant: IPlant;
  }>()
);
export const deletePlantSuccess = createAction(
  `${deletePlant.type} Success`,
  props<{
    plant: IPlant;
  }>()
);
