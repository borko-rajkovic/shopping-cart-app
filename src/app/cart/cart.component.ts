import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(
    public activeModal: NgbActiveModal,
    private store: Store<fromApp.AppState>
  ) {}

  ngUnsubscribe$ = new Subject();

  totalPrice: number;

  ngOnInit(): void {
    this.store
      .select('cart')
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((cart) => {
        this.totalPrice = cart.totalPrice;
      });
  }

  get isCheckoutDisabled() {
    return this.totalPrice === 0;
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
