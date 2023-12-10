import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bike } from '../../models/bike';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable, Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { ViewBikeDetailsDialogComponent } from '../../dialogs/view-bike-details-dialog/view-bike-details-dialog.component';
import { BikeCardComponent } from '../bike-card/bike-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bike-list',
  standalone: true,
  imports: [CommonModule, BikeCardComponent, FormsModule, MatInputModule,
     MatButtonModule, MatDialogModule, MatIconModule, RouterLink],
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BikeListComponent implements OnDestroy {

  bikeList$: Observable<Bike[] | null>;
  searchValue: any;

  private subscription: Subscription = new Subscription();

  constructor(private store$: Store, private dialog: MatDialog) {
    this.bikeList$ = this.store$.select(fromStore.selectBikeList);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onViewBike(bikeId: number) {
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      width: '50vw',
      data: { bikeId }
    };
    this.dialog.open(ViewBikeDetailsDialogComponent, dialogConfig);
  }

  onRemoveBike(bikeId: number) {
    this.subscription.add(
      this.store$.dispatch(fromStore.deleteBike({ bikeId }))
    );
  }

}
