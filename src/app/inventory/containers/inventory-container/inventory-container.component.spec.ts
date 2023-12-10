import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryContainerComponent } from './inventory-container.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromStore from '../../store';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('InventoryContainerComponent', () => {
  let component: InventoryContainerComponent;
  let fixture: ComponentFixture<InventoryContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryContainerComponent],
      imports: [
        HttpClientModule,
        RouterModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
        StoreModule.forFeature(fromStore.inventoryStoreName, fromStore.reducer),
        EffectsModule.forFeature(fromStore.effects)
      ]
    });
    fixture = TestBed.createComponent(InventoryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
