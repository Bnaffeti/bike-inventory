import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryContainerComponent } from './containers/inventory-container/inventory-container.component';
import { BikeListComponent } from './components/bike-list/bike-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromStore from './store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    InventoryContainerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forFeature(fromStore.inventoryStoreName, fromStore.reducer),
    EffectsModule.forFeature(fromStore.effects),
    BikeListComponent,
    InventoryRoutingModule
  ]
})
export class InventoryModule { }
