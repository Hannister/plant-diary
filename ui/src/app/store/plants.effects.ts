import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import * as fromPlants from './index';
import { DashboardService } from '../dashboard/services/dashboard.service';
import { IPlant } from '../interfaces and enums/plant';

@Injectable()
export class PlantsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly dashboardService: DashboardService
  ) {}

  gePlants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPlants.getPlants.type),
      switchMap(() => this.dashboardService.getPlants()),
      map((plants: IPlant[]) => fromPlants.getPlantsSuccess({ plants }))
    )
  );

  createPlant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPlants.createPlant),
      switchMap(({ plant }) =>
        this.dashboardService.createPlant(plant as IPlant)
      ),
      map((plant: IPlant) => fromPlants.createPlantSuccess({ plant }))
    )
  );

  updatePlant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPlants.updatePlant),
      switchMap(({ plant }) => this.dashboardService.updatePlant(plant)),
      map((plant: IPlant) => fromPlants.updatePlantSuccess({ plant }))
    )
  );

  deletePlant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPlants.deletePlant),
      switchMap(({ plant }) => this.dashboardService.deletePlant(plant)),
      map((plant: IPlant) => fromPlants.deletePlantSuccess({ plant }))
    )
  );
}
