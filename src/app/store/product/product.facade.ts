import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ProductActions from '../product/product.actions';
import * as ProductSelectors from '../product/product.selectors';
import { Product } from 'src/app/category.model';

@Injectable({
  providedIn: 'root',
})
export class ProductFacade {
  products$: Observable<Product> = this.store.select(
    ProductSelectors.selectProducts
  );

  constructor(private store: Store) {}

  loadProduct() {
    this.store.dispatch(ProductActions.loadProduct());
  }

  updateProduct(form: any) {
    this.store.dispatch(ProductActions.updateProduct(form));
  }

  deleteProduct(id: any) {
    this.store.dispatch(ProductActions.removeProduct(id));
  }

  addProduct(product: any) {
    this.store.dispatch(ProductActions.addProduct(product));
  }
}
