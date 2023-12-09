import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BikeComponent } from './bike.component';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { InventoryService } from '../../services/inventory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as fromStore from '../../store';
import { Bike } from '../../models/bike';

describe('BikeComponent', () => {
  let component: BikeComponent;
  let fixture: ComponentFixture<BikeComponent>;
  let inventoryServiceMock: any;
  let storeMock: any;
  let locationMock: any;
  let routeMock: any;

  beforeEach(async () => {
    inventoryServiceMock = jasmine.createSpyObj('InventoryService', ['getBikeById']);
    storeMock = jasmine.createSpyObj('Store', ['dispatch']);
    locationMock = jasmine.createSpyObj('Location', ['back']);
    routeMock = {
      snapshot: { queryParams: { 'id': '1' } }
    };

    await TestBed.configureTestingModule({
      declarations: [BikeComponent],
      imports: [ReactiveFormsModule, StoreModule.forRoot({})],
      providers: [
        FormBuilder,
        { provide: InventoryService, useValue: inventoryServiceMock },
        { provide: Store, useValue: storeMock },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: Location, useValue: locationMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch bike details and update the form if bikeId is present in route queryParams', () => {
    const bike: Bike = {
      id: 1,
      name: 'Test Bike',
      brand: 'Test Brand',
      model: 'Test Model',
      price: 100,
      quantity: 50,
    };
    inventoryServiceMock.getBikeById.and.returnValue(of(bike));

    fixture = TestBed.createComponent(BikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(inventoryServiceMock.getBikeById).toHaveBeenCalledWith(1);
    expect(component.bikeForm.get('id')?.value).toEqual(1);
    expect(component.bikeForm.get('name')?.value).toEqual('Test Bike');
    expect(component.bikeForm.get('brand')?.value).toEqual('Test Brand');
    expect(component.bikeForm.get('model')?.value).toEqual('Test Model');
    expect(component.bikeForm.get('price')?.value).toEqual(100);
    expect(component.bikeForm.get('quantity')?.value).toEqual(50);
  });

  describe('onSave', () => {
    beforeEach(() => {
      component.bikeForm.setValue({
        id: null,
        name: 'New Bike',
        brand: 'New Brand',
        model: 'New Model',
        price: 100,
        quantity: 50,
      });
    });

    it('should dispatch addBike action if form is valid and id is not present', () => {
      component.onSave();

      expect(storeMock.dispatch).toHaveBeenCalledWith(fromStore.addBike({ bike: component.bikeForm.value }));
      expect(locationMock.back).toHaveBeenCalled();
    });

    it('should dispatch editBike action if form is valid and id is present', () => {
      component.bikeForm.get('id')?.setValue(1);
      component.onSave();

      expect(storeMock.dispatch).toHaveBeenCalledWith(fromStore.editBike({ bike: component.bikeForm.value }));
      expect(locationMock.back).toHaveBeenCalled();
    });

    it('should not dispatch any action if form is invalid', () => {
      component.bikeForm.get('name')?.setValue('');
      component.onSave();

      expect(storeMock.dispatch).not.toHaveBeenCalled();
    });
  });
});
