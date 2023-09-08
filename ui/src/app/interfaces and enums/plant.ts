import { LightRequirement } from './light-requirement.enum';

export interface IPlant {
  _id: number;
  plantName: string;
  plantNickName: string;
  plantFamily: string;
  light: LightRequirement;
  water: string;
  image: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
