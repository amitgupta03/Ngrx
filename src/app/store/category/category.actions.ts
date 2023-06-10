import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/category.model';

export const addCategory = createAction(
  '[Category Page] Add Category',
  props<{ content: string }>()
);

export const removeCategory = createAction(
  '[Category Page] Remove Category',
  props<{ id: string }>()
);

export const loadCategories = createAction('[Category Page] Load categories');

export const loadCategoriesSuccess = createAction(
  '[Category API] Category Load Success',
  props<{ categories: Category[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Category API] Category Load Failure',
  props<{ error: string }>()
);