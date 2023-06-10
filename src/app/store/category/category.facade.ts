import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CategoryActions from '../../store/category/category.actions';
import * as CategorySelectors from '../../store/category/category.selectors';
import { Category } from 'src/app/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryFacade {
  categories$: Observable<Category> = this.store.select(
    CategorySelectors.selectCategories
  );

  constructor(private store: Store) {}

  loadCategories() {
    this.store.dispatch(CategoryActions.loadCategories());
  }
}
