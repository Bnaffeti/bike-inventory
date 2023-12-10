import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Bike } from '../../models/bike';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Subscription, take } from 'rxjs';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-bike',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BikeComponent implements OnDestroy {

  bikeForm!: FormGroup;

  private subscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder,
    private store$: Store,
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private location: Location) {
    this.bikeForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      description: [''],
      rating: ['', [Validators.min(0), Validators.max(5)]],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      photoUrl: ['']
    });
  }

  ngOnInit() {
    // If we have and id in the URL so we are in the edit mode
    const bikeId = Number(this.route.snapshot.queryParams['id']);
    if (bikeId) {
      // get the bike by id and initiate the form
      this.subscription.add(
        this.inventoryService.getBikeById(bikeId)
          .pipe(take(1))
          .subscribe(bike => this.bikeForm.patchValue(bike))
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSave() {
    // validate the form
    this.bikeForm?.updateValueAndValidity();
    this.bikeForm?.markAllAsTouched();
    if (this.bikeForm.valid) {
      const bike: Bike = this.bikeForm.value;
      // Edit a bike or create a new bike
      if (bike.id) {
        this.subscription.add(
          this.store$.dispatch(fromStore.editBike({ bike }))
        );
      } else {
        this.subscription.add(
          this.store$.dispatch(fromStore.addBike({ bike }))
        );
      }
      this.location.back();
    }
  }
}
