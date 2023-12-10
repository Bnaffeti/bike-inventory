import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryContainerComponent } from './containers/inventory-container/inventory-container.component';
import { BikeListComponent } from './components/bike-list/bike-list.component';
import { BikeComponent } from './components/bike/bike.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryContainerComponent,
    children: [
      {
        path: 'bike-list',
        component: BikeListComponent
      },
      {
        path: 'bike',
        component: BikeComponent
      },
      {
        path: '**',
        redirectTo: 'bike-list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
