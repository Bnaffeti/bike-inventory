import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Subscription } from 'rxjs';

/**
 * The Inventory container component, to handel the module childrens redirections, initialisations, actions,
 * and diplay common UI or components of the module
 * @author Bnaffeti
 */
@Component({
  selector: 'app-inventory-container',
  templateUrl: './inventory-container.component.html',
  styleUrls: ['./inventory-container.component.scss'],
})
export class InventoryContainerComponent implements OnDestroy {

  private subscription: Subscription = new Subscription();

  constructor(private store$: Store) {
    this.subscription.add(
      this.store$.dispatch(fromStore.getBikeList())
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onRemove(bikeId: number) {
    this.subscription.add(
      this.store$.dispatch(fromStore.deleteBike({ bikeId }))
    );
  }
}
