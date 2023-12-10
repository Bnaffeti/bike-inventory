import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions/inventory.actions';
import { IInventoryState } from '../../models/inventory-state';

export const inventoryStoreName = 'inventory';

export const initialInventoryState: IInventoryState = {
  inventory: [],
};

export const inventoryReducer = createReducer(
  initialInventoryState,

  on(fromActions.getBikeListSuccess, (state, { bikeList }) =>
    ({ ...state, inventory : bikeList })),

);

export const reducer = (state: IInventoryState, action: Action): IInventoryState =>
inventoryReducer(state, action);

