import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
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
        let source$: Observable<any>;
        switch (action.actionType) {
          case 'update':
            source$ = this.categoryService.updateProduct('', action).pipe(
              map(() => ProductActions.UpdateProductSuccess(action)),
              catchError((error: any) =>
                of(ProductActions.UpdateProductFailure({ error }))
              )
            );
            break;
          case 'delete':
            source$ = this.categoryService.deleteProduct('', action).pipe(
              map(() => ProductActions.removeProductSuccess(action)),
              catchError((error: any) =>
                of(ProductActions.removeProductFailure({ error }))
              )
            );
            break;
          case 'add':
            source$ = this.categoryService.addProduct('', action).pipe(
              map(() => ProductActions.addProductSuccess(action)),
              catchError((error: any) =>
                of(ProductActions.addProductFailure({ error }))
              )
            );
            break;
          default:
            console.log('No Action');
            source$ = of();
            break;
        }
        return source$;
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
