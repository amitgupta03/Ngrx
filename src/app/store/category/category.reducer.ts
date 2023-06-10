import { createReducer, on } from '@ngrx/store';
import { loadCategoriesSuccess } from './category.actions';
import { Category } from 'src/app/category.model';

export interface CategoryState {
  categories: Category[];
  error: string | null;
}

export const initialCategoryState: CategoryState = {
  categories: [],
  error: null,
};

export const categoryReducer = createReducer(
  initialCategoryState,
  on(loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
  }))
);
