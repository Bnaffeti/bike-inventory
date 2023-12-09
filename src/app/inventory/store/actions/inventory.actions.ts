import { createAction, props } from '@ngrx/store';
import { Bike } from '../../models/bike';


export const getBikeList = createAction(
  '[Inventory] Get Bike List Draft',
);

export const getBikeListSuccess = createAction(
  '[Inventory] Get Bike List Draft Success',
  props<{ bikeList: Bike[] }>()
);

export const addBike = createAction(
  '[Inventory] Add Bike',
  props<{ bike: Bike }>()
);

export const addBikeSuccess = createAction(
  '[Inventory] Add Bike Success',
);

export const editBike = createAction(
  '[Inventory] Edit Bike',
  props<{ bike: Bike }>()
);

export const editBikeSuccess = createAction(
  '[Inventory] Edit Bike Success',
);

export const deleteBike = createAction(
  '[Inventory] Delete Bike',
  props<{ bikeId: number }>()
);

export const deleteBikeSuccess = createAction(
  '[Inventory] Delete Bike Success',
);

export const actionFailed = createAction(
  '[Inventory] Action Failed',
  props<{ error: string }>()
);
