import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.state';

export const selectProductsState = createFeatureSelector<ProductState>(
  'products'
);

export const selectProducts = createSelector(
  selectProductsState,
  (state: ProductState) => state.products
);
