import { LightRequirement } from './light-requirement.enum';

export interface IPlant {
  plantName: string;
  plantNickName?: string;
  plantFamily?: string;
  light: LightRequirement;
  water: string;
  image: string;
}
