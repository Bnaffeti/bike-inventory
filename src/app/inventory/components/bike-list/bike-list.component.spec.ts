import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BikeListComponent } from './bike-list.component';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromStore from '../../store';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BikeListComponent', () => {
  let component: BikeListComponent;
  let fixture: ComponentFixture<BikeListComponent>;
  let store: Store;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
        StoreModule.forFeature(fromStore.inventoryStoreName, fromStore.reducer),
        EffectsModule.forFeature(fromStore.effects)
      ],
      providers: [
        { provide: MatDialog, useValue: { open: jasmine.createSpy('open') } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.inject(Store);
    dialog = TestBed.inject(MatDialog);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
