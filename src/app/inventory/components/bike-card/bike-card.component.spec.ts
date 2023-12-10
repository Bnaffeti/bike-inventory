import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BikeCardComponent } from './bike-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Bike } from '../../models/bike';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BikeCardComponent', () => {
  let component: BikeCardComponent;
  let fixture: ComponentFixture<BikeCardComponent>;
  let mockBike: Bike;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BikeCardComponent],
      imports: [MatCardModule, MatIconModule, MatButtonModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
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

  it('should display bike details', () => {
    const bikeName = fixture.debugElement.query(By.css('.bike-name')).nativeElement.textContent;
    expect(bikeName).toContain(mockBike.name);
  });

  it('should emit onViewBike event when details button is clicked', () => {
    spyOn(component.onViewBike, 'emit');

    const button = fixture.debugElement.query(By.css('.details-button'));
    button.triggerEventHandler('click', null);

    expect(component.onViewBike.emit).toHaveBeenCalledWith(mockBike.id);
  });

  it('should emit onRemoveBike event when remove button is clicked', () => {
    spyOn(component.onRemoveBike, 'emit');

    const button = fixture.debugElement.query(By.css('.remove-button'));
    button.triggerEventHandler('click', null);

    expect(component.onRemoveBike.emit).toHaveBeenCalledWith(mockBike.id);
  });

});
