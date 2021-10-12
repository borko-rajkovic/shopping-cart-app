import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Product } from 'backend/src/models/Product';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CartComponent } from '../cart/cart.component';
import * as CartActions from '../cart/store/cart.actions';
import { IQuantities } from '../interfaces/IQuantities';
import * as fromApp from '../store/app.reducer';
import { SortEvent } from './directives/sortable.directive';
import * as ProductListActions from './store/product-list.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  ngUnsubscribe$ = new Subject();

  cartLength: number;
  products: Product[] = [];
  cartQuantities: IQuantities = {};
  quantities: IQuantities = {};
  loading: boolean;
  searchTerm: string;

  constructor(
    private store: Store<fromApp.AppState>,
    private modalService: NgbModal
  ) {}

  get filteredProducts(): Product[] {
    const cartProductIds = Object.keys(this.cartQuantities);

    return this.products.filter((p) => !cartProductIds.includes(p.id));
  }

  ngOnInit(): void {
    this.store.dispatch(new ProductListActions.FetchProducts());

    this.store
      .select('productList')
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((products) => {
        this.loading = products.loading;
        this.products = products.error ? [] : products.products;
        this.products.forEach((product) => {
          if (!this.quantities[product.id]) {
            this.quantities[product.id] = 0;
          }
        });
        this.searchTerm = products.searchTerm;
      });

    this.store
      .select('cart')
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((cart) => {
        this.cartQuantities = cart.quantities;
        this.cartLength = Object.keys(cart.quantities).length;
      });
  }

  onSearchChange(value: string) {
    this.store.dispatch(new ProductListActions.FilterProducts(value));
  }

  onSort(event: SortEvent) {
    if (event.column === 'price') {
      this.store.dispatch(
        new ProductListActions.SortProductsByPrice(event.direction)
      );
    }
  }

  onQuantityChanged(event: number, product: Product) {
    this.quantities[product.id] = event;
  }

  getMaximum(product: Product) {
    const cartQuantity = this.cartQuantities[product.id] || 0;
    return product.quantity - cartQuantity;
  }

  getValue(product: Product) {
    return this.quantities[product.id];
  }

  isAddDisabled(product: Product) {
    return this.quantities[product.id] === 0;
  }

  addToCart(product: Product) {
    this.store.dispatch(
      new CartActions.AddQuantity({
        productId: product.id,
        quantity: this.quantities[product.id],
      })
    );
    this.quantities[product.id] = 0;
  }

  showCartModal() {
    this.modalService.open(CartComponent, {size: 'xl'});
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
