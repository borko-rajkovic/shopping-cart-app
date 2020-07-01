import { Action } from '@ngrx/store';
import { IProductQuantity } from 'src/app/interfaces/IProductQuantity';

export const ADD_QUANTITY = '[Cart] Add Quantity';
export const REMOVE_QUANTITY = '[Cart] Remove Quantity';
export const REMOVE_PRODUCT = '[Cart] Remove Product';

export class AddQuantity implements Action {
  readonly type = ADD_QUANTITY;

  constructor(public payload: IProductQuantity) {}
}

export class RemoveQuantity implements Action {
  readonly type = REMOVE_QUANTITY;

  constructor(public payload: IProductQuantity) {}
}

export class RemoveProduct implements Action {
  readonly type = REMOVE_PRODUCT;

  constructor(public payload: string) {}
}

export type CartActions = AddQuantity | RemoveProduct | RemoveQuantity;
