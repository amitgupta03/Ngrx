import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as CategoryActions from './category.actions';
import { CategoryService } from 'src/app/service.ts/category.service';

@Injectable()
export class CategoryEffects {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.loadCategories),
      switchMap(() =>
        this.categoryService.getAllCategories().pipe(
          tap((data) => console.log(data, 'outer')),
          map((categories) =>
            categories.products.filter(
              (value: any, index: number, self: any) =>
                self.findIndex((c: any) => c.category === value.category) ===
                index
            )
          ),
          tap((data) => console.log(data, 'ssas')),
          map((categories) =>
            CategoryActions.loadCategoriesSuccess({ categories: categories })
          ),
          catchError((error) =>
            of(CategoryActions.loadCategoriesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}
}
