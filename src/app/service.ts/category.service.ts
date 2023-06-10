import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'https://dummyjson.com/product';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getAllProducts(): Observable<any> {
    return this.http.get<any>('https://dummyjson.com/products');
  }

  updateProduct(url: any,body: any): Observable<any> {
    return this.http.put<any>(`https://dummyjson.com/products/${body.id}`, body);
  }

  deleteProduct(url: any,body: any): Observable<any> {
    return this.http.delete<any>(`https://dummyjson.com/products/${body.id}`);
  }

  addProduct(url: any,body: any): Observable<any> {
    return this.http.post<any>(`https://dummyjson.com/products/add`, body);
  }
}
