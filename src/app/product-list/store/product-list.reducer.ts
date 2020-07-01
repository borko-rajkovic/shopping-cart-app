import * as ProductListActions from './product-list.actions';
import { Product } from 'src/app/models/Product';
import { SortDirection } from '../directives/sortable.directive';

export interface State {
  originalProducts: Product[];
  products: Product[];
  loading: boolean;
  error: string;
  searchTerm: string;
  sortByPrice: SortDirection;
}

const initialState: State = {
  originalProducts: [],
  products: [],
  loading: false,
  error: null,
  searchTerm: '',
  sortByPrice: '',
};

const sortAndFilter = (
  originalProducts: Product[],
  searchTerm: string,
  sortByPrice: SortDirection
): Product[] => {
  const sortedProducts = originalProducts.slice();
  switch (sortByPrice) {
    case 'asc':
      sortedProducts.sort((a, b) =>
        a.price > b.price ? 1 : b.price > a.price ? -1 : 0
      );
      break;
    case 'desc':
      sortedProducts.sort((a, b) =>
        a.price < b.price ? 1 : b.price < a.price ? -1 : 0
      );
      break;
  }

  const filteredProducts = sortedProducts.filter((p) =>
    p.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return filteredProducts;
};

export function productListReducer(
  state: State = initialState,
  action: ProductListActions.ProductListActions
) {
  switch (action.type) {
    case ProductListActions.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        originalProducts: action.payload,
        loading: false,
      };
    case ProductListActions.FETCH_PRODUCTS:
      return {
        ...state,
        loading: true,
        searchTerm: '',
        error: null,
      };
    case ProductListActions.FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        originalProducts: [],
        products: [],
      };
    case ProductListActions.SORT_PRODUCTS_BY_PRICE:
      const sortByPrice = action.payload;
      const sortedProducts = sortAndFilter(
        state.originalProducts,
        state.searchTerm,
        action.payload
      );
      return {
        ...state,
        sortByPrice,
        products: sortedProducts,
      };

    case ProductListActions.FILTER_PRODUCTS:
      const searchTerm = action.payload;
      const filteredProducts = sortAndFilter(
        state.originalProducts,
        searchTerm,
        state.sortByPrice
      );
      return {
        ...state,
        searchTerm,
        products: filteredProducts,
      };
    default:
      return state;
  }
}
