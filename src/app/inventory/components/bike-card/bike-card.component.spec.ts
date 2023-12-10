import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BikeCardComponent } from './bike-card.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { Bike } from '../../models/bike';

describe('BikeCardComponent', () => {
  let component: BikeCardComponent;
  let fixture: ComponentFixture<BikeCardComponent>;
  let mockBike: Bike;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BikeCardComponent);
    component = fixture.componentInstance;

    mockBike = {
      id: 1,
      name: 'Test Bike',
      brand: 'Test Brand',
      model: 'Test Model',
      price: 120,
      quantity: 99
    };

    component.bike = mockBike;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit bike ID on view details', () => {
    spyOn(component.onViewBike, 'emit');
    component.onDetails(mockBike.id);
    expect(component.onViewBike.emit).toHaveBeenCalledWith(mockBike.id);
  });

  it('should emit bike ID on remove', () => {
    spyOn(component.onRemoveBike, 'emit');
    component.onRemove(mockBike.id);
    expect(component.onRemoveBike.emit).toHaveBeenCalledWith(mockBike.id);
  });

  // Additional tests for displaying bike data can be added here
});
