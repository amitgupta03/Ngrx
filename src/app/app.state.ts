import { categoryReducer } from "./store/category/category.reducer";
import { CategoryState } from "./store/category/category.state";
import { ProductReducer, ProductState } from "./store/product/product.reducer";

export interface AppState {
  categories: CategoryState;
  products: ProductState
}


export const appReducer = {
  categories: categoryReducer,
  products: ProductReducer
}
