import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/category.model';

export const addProduct = createAction(
  '[Product Page] Add Product',
  props<{ data: any }>()
);

export const addProductSuccess = createAction(
  '[Product API] Product Add Success',
  props<{ products: any }>()
);

export const addProductFailure = createAction(
  '[Product API] Product Add Failure',
  props<{ error: string }>()
);

//Load Product

export const loadProduct = createAction('[Product Page] Load Products');

export const loadProductSuccess = createAction(
  '[Product API] Product Load Success',
  props<{ products: Product[] }>()
);

export const loadProductFailure = createAction(
  '[Product API] Product Load Failure',
  props<{ error: string }>()
);

//Update Product

export const updateProduct = createAction(
  '[Product Page] Update Product',
  props<{ data: string }>()
);

export const UpdateProductSuccess = createAction(
  '[Product API] Product Update Success',
  props<{ products: any }>()
);

export const UpdateProductFailure = createAction(
  '[Product API] Product Update Failure',
  props<{ error: string }>()
);

// Delete Product

export const removeProduct = createAction(
  '[Product Page] Remove Product',
  props<{ data: any }>()
);

export const removeProductSuccess = createAction(
  '[Product API] Product remove Success',
  props<{ products: any }>()
);

export const removeProductFailure = createAction(
  '[Product API] Product remove Failure',
  props<{ error: string }>()
);
