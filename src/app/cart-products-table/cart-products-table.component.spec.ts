import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromApp from '../store/app.reducer';
import { StoreModule } from '@ngrx/store';
import { GermanCurrencyFormatPipe } from '../pipes/german-currency-format.pipe';

import { CartProductsTableComponent } from './cart-products-table.component';

describe('CartProductsTableComponent', () => {
  let component: CartProductsTableComponent;
  let fixture: ComponentFixture<CartProductsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(fromApp.appReducer)],
      declarations: [CartProductsTableComponent, GermanCurrencyFormatPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
