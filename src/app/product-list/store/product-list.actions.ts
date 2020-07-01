import { Action } from '@ngrx/store';
import { Product } from 'src/app/models/Product';
import { SortDirection } from '../directives/sortable.directive';

export const FETCH_PRODUCTS = '[Product List] Fetch Products';
export const SET_PRODUCTS = '[Product List] Set Products';
export const FETCH_PRODUCTS_ERROR = '[Product List] Fetch Products Error';

export const FILTER_PRODUCTS = '[Product List] Filter Products';
export const SORT_PRODUCTS_BY_PRICE = '[Product List] Sort Products by price';

export class FetchProducts implements Action {
  readonly type = FETCH_PRODUCTS;
}

export class SetProducts implements Action {
  readonly type = SET_PRODUCTS;

  constructor(public payload: Product[]) {}
}

export class FetchProductsError implements Action {
  readonly type = FETCH_PRODUCTS_ERROR;

  constructor(public payload: string) {}
}

export class FilterProducts implements Action {
  readonly type = FILTER_PRODUCTS;

  constructor(public payload: string) {}
}

export class SortProductsByPrice implements Action {
  readonly type = SORT_PRODUCTS_BY_PRICE;

  constructor(public payload: SortDirection) {}
}

export type ProductListActions =
  | FetchProducts
  | SetProducts
  | FetchProductsError
  | FilterProducts
  | SortProductsByPrice;
