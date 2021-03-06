import { ActionReducerMap } from '@ngrx/store';

import * as fromProductList from '../product-list/store/product-list.reducer';
import * as fromCart from '../cart/store/cart.reducer';
import * as fromCheckout from '../checkout/store/checkout.reducer';

export interface AppState {
  productList: fromProductList.State;
  cart: fromCart.State;
  checkout: fromCheckout.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  productList: fromProductList.productListReducer,
  cart: fromCart.cartReducer,
  checkout: fromCheckout.checkoutReducer,
};
