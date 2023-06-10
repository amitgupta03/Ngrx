import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as ProductActions from './product.actions';
import { CategoryService } from 'src/app/service.ts/category.service';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProduct),
      switchMap(() =>
        this.categoryService.getAllProducts().pipe(
          map((products) =>
            ProductActions.loadProductSuccess({ products: products.products })
          ),
          catchError((error) =>
            of(ProductActions.loadProductFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateProductList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct), // Dispatch this action to trigger the effect
      mergeMap((action: any) => {
        if (action.actionType === 'update') {
          return this.categoryService.updateProduct('', action).pipe(
            map(() => ProductActions.UpdateProductSuccess(action)),
            catchError((error: any) =>
              of(ProductActions.UpdateProductFailure({ error }))
            )
          );
        } else if (action.actionType === 'delete') {
          return this.categoryService.deleteProduct('', action).pipe(
            map(() => ProductActions.removeProductSuccess(action)),
            catchError((error: any) =>
              of(ProductActions.removeProductFailure({ error }))
            )
          );
        } else if (action.actionType === 'add') {
          return this.categoryService.addProduct('', action).pipe(
            map(() => ProductActions.addProductSuccess(action)),
            catchError((error: any) =>
              of(ProductActions.addProductFailure({ error }))
            )
          );
        } else {
          console.log('No Action');
          return of();
        }
      })
    )
  );
  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}
}

// this.categoryService.updateProduct('', action).pipe(
//   map(() => ProductActions.UpdateProductSuccess(action)), // Dispatch success action
//   catchError(
//     (error: any) =>
//       of(ProductActions.UpdateProductSuccess(action)) // Dispatch failure action
//   )
// )
