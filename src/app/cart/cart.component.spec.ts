import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './cart.component';
import * as fromApp from '../store/app.reducer';
import { StoreModule } from '@ngrx/store';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule, StoreModule.forRoot(fromApp.appReducer)],
      declarations: [CartComponent],
      providers: [NgbActiveModal],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
