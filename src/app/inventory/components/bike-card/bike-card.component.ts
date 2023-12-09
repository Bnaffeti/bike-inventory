import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Bike } from '../../models/bike';

@Component({
  selector: 'app-bike-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './bike-card.component.html',
  styleUrls: ['./bike-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BikeCardComponent {

  @Input() bike!: Bike;

  @Output() onViewBike = new EventEmitter<number>();
  @Output() onRemoveBike = new EventEmitter<number>();

  onDetails(bikeId: number) {
    this.onViewBike.emit(bikeId);
  }

  onRemove(bikeId: number) {
    this.onRemoveBike.emit(bikeId);
  }
}
