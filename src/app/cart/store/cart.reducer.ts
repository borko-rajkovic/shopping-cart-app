import * as CartActions from './cart.actions';
import * as ProductListActions from '../../product-list/store/product-list.actions';
import { IQuantities } from 'src/app/interfaces/IQuantities';
import { Product } from 'src/app/models/Product';

export interface State {
  quantities: IQuantities;
  products: Product[];
  totalPrice: number;
}

const initialState: State = {
  quantities: {},
  products: [],
  totalPrice: 0,
};

const roundNumber = (num: number) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

export function cartReducer(
  state: State = initialState,
  action: CartActions.CartActions | ProductListActions.ProductListActions
) {
  switch (action.type) {
    case ProductListActions.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case CartActions.ADD_QUANTITY: {
      const { productId, quantity } = action.payload;

      const totalPrice =
        state.totalPrice +
        quantity * state.products.find((p) => p.id === productId).price;

      return {
        ...state,
        quantities: {
          ...state.quantities,
          [productId]: (state.quantities[productId] || 0) + quantity,
        },
        totalPrice: roundNumber(totalPrice),
      };
    }
    case CartActions.REMOVE_QUANTITY: {
      const { productId, quantity } = action.payload;

      const totalPrice =
        state.totalPrice -
        quantity * state.products.find((p) => p.id === productId).price;

      return {
        ...state,
        quantities: {
          ...state.quantities,
          [productId]: (state.quantities[productId] || 0) - quantity,
        },
        totalPrice: roundNumber(totalPrice),
      };
    }
    case CartActions.REMOVE_PRODUCT: {
      const productId = action.payload;

      const newTotalPrice =
        state.totalPrice -
        state.quantities[productId] *
          state.products.find((p) => p.id === productId).price;

      const newQuantities = { ...state.quantities };

      delete newQuantities[productId];

      return {
        ...state,
        quantities: newQuantities,
        totalPrice: roundNumber(newTotalPrice),
      };
    }
    default:
      return state;
  }
}
