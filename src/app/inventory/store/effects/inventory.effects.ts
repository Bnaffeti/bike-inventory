import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActions from '../actions/inventory.actions';
import { catchError, map, of, switchMap } from "rxjs";
import { InventoryService } from "../../services/inventory.service";

@Injectable()
export class InventoryEffects {


  getBikeList$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getBikeList),
    switchMap(() => {
      return this.inventoryService.getAllBikes().pipe(
        map(response => {
          return fromActions.getBikeListSuccess({ bikeList: response });
        }
        ),
        catchError(error => of(fromActions.actionFailed({ error })))
      );
    })
  ));

  addBike$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.addBike),
    switchMap(({bike}) => {
      return this.inventoryService.addBikes(bike).pipe(
        map(response => {
          return fromActions.getBikeList();
        }
        ),
        catchError(error => of(fromActions.actionFailed({ error })))
      );
    })
  ));


  editBike$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.editBike),
    switchMap(({bike}) => {
      return this.inventoryService.editBikes(bike).pipe(
        map(response => {
          return fromActions.getBikeList();
        }
        ),
        catchError(error => of(fromActions.actionFailed({ error })))
      );
    })
  ));

  deleteBike$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.deleteBike),
    switchMap(({bikeId}) => {
      return this.inventoryService.deleteBikes(bikeId).pipe(
        map(response => {
          return fromActions.getBikeList();
        }
        ),
        catchError(error => of(fromActions.actionFailed({ error })))
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private inventoryService: InventoryService
  ) {
  }

}
