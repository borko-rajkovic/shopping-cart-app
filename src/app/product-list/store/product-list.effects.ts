import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import { ToastService } from 'src/app/toasts/toast.service';

import { Product } from '../../models/Product';
import * as ProductListActions from './product-list.actions';

@Injectable()
export class ProductListEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private toastService: ToastService
  ) {}

  @Effect()
  fetchProducts = this.actions$.pipe(
    ofType(ProductListActions.FETCH_PRODUCTS),
    // add some artificial delay
    delay(1000),
    switchMap(() => {
      return this.http.get<Product[]>('http://localhost:3000/product');
    }),
    map((products) => {
      this.toastService.show('Products fetched successfuly', {
        classname: 'bg-success text-light',
        delay: 5000,
      });
      return new ProductListActions.SetProducts(products);
    }),
    catchError((error: Error) => {
      this.toastService.show(error.message, {
        classname: 'bg-danger text-light',
        delay: 5000,
        header: 'Error',
      });
      return of(new ProductListActions.FetchProductsError(error.message));
    })
  );
}
