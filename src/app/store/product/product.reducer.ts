import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/category.model';
import {
  UpdateProductFailure,
  UpdateProductSuccess,
  addProduct,
  loadProductFailure,
  loadProductSuccess,
  removeProduct,
} from './product.actions';

export interface ProductState {
  products: Product[];
  error: string | null;
}

export const initialProductState: ProductState = {
  products: [],
  error: null,
};

export const ProductReducer = createReducer(
  initialProductState,
  on(loadProductSuccess, (state, { products }) => ({
    ...state,
    products,
  })),

  on(UpdateProductSuccess, (state: any, product: any) => {
    const updatedProducts = state.products.map((p: any) =>
      p.id === product.id ? product : p
    );

    return { ...state, products: updatedProducts };
  }),

  on(removeProduct, (state: any, product: any) => {
    const updatedProducts = state.products.filter(
      (p: any) => p.id !== product.id
    );

    return { ...state, products: updatedProducts };
  }),

  on(addProduct, (state: any, product) => {
    const newProduct = { ...product, id: +state.products.length+1 };
    const updatedProducts = [...state.products, newProduct];
    return { ...state, products: updatedProducts };
  })
);
