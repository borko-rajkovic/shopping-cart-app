import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CartActions from '../cart/store/cart.actions';
import * as fromApp from '../store/app.reducer';
import { Subject } from 'rxjs';
import { Product } from '../models/Product';
import { IQuantities } from '../interfaces/IQuantities';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cart-products-table',
  templateUrl: './cart-products-table.component.html',
  styleUrls: ['./cart-products-table.component.css'],
})
export class CartProductsTableComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) {}

  ngUnsubscribe$ = new Subject();

  products: Product[];
  quantities: IQuantities;
  totalPrice: number;

  get cartProducts() {
    return Object.keys(this.quantities).map((productId) => ({
      product: this.products.find((p) => p.id === productId),
      quantity: this.quantities[productId],
    }));
  }

  ngOnInit(): void {
    this.store
      .select('cart')
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((cart) => {
        this.totalPrice = cart.totalPrice;
        this.quantities = cart.quantities;
        this.products = cart.products;
      });
  }

  removeProduct(product: Product) {
    this.store.dispatch(new CartActions.RemoveProduct(product.id));
  }

  getMaximum(product: Product) {
    return product.quantity;
  }

  getValue(product: Product) {
    return this.quantities[product.id];
  }

  onQuantityDecrement(product: Product) {
    this.store.dispatch(
      new CartActions.RemoveQuantity({ productId: product.id, quantity: 1 })
    );
  }

  onQuantityIncrement(product: Product) {
    this.store.dispatch(
      new CartActions.AddQuantity({ productId: product.id, quantity: 1 })
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
