import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { InventoryService } from "../../services/inventory.service";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { Bike } from "../../models/bike";
import { map, switchMap, take } from "rxjs";
import { ExchangeService } from "../../services/exchange.service";

/**
 * A dialog component to display a bike details and convert the price to other currencies
 * @author Bnaffeti
 */
@Component({
  selector: 'app-view-bike-details-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule],
  templateUrl: './view-bike-details-dialog.component.html',
  styleUrls: ['./view-bike-details-dialog.component.scss']
})
export class ViewBikeDetailsDialogComponent {

  bike!: Bike;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private inventoryService: InventoryService,
    private exchangeService: ExchangeService) {

    // Get bike by id
    // Get the live exchenge currencies rates to display the price in EUR ans CAD
    this.inventoryService.getBikeById(data.bikeId)
      .pipe(
        switchMap(bike => {
          return this.exchangeService.getRates().pipe(
            take(1),
            map(rates => {
              return {
                ...bike,
                euroPrice: bike.price * rates.EUR ?? 1,
                cadPrice: bike.price * rates.CAD ?? 1,
              };
            })
          );
        })
      ).subscribe(result => this.bike = result);
  }

}
