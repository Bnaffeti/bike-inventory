import { createFeatureSelector, createSelector } from '@ngrx/store';
import { inventoryStoreName } from '../reducers';
import { IInventoryState } from '../../models/inventory-state';

export const selectInventoryState = createFeatureSelector<IInventoryState>(inventoryStoreName);

export const selectBikeList = createSelector(selectInventoryState,
  (state: IInventoryState) => state?.inventory);
