import { IPlant } from './plant';

export interface IPlantsState {
  plants: IPlant[];
  isLoading: boolean;
}
