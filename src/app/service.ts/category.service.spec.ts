import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpClientMock: any;
  let categoryService: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CategoryService);
    httpClientMock = {
      get: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      post: jest.fn(),
    };
    categoryService = new CategoryService(httpClientMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call HttpClient get method with the apiUrl for getAllCategories', () => {
    categoryService.getAllCategories();

    expect(httpClientMock.get).toHaveBeenCalledWith(
      'https://dummyjson.com/product'
    );
  });

  it('should call HttpClient get method with the products URL for getAllProducts', () => {
    categoryService.getAllProducts();

    expect(httpClientMock.get).toHaveBeenCalledWith(
      'https://dummyjson.com/products'
    );
  });

  it('should call HttpClient put method with the correct URL and body for updateProduct', () => {
    const body = { id: 1, name: 'Updated Product' };

    categoryService.updateProduct('', body);

    expect(httpClientMock.put).toHaveBeenCalledWith(
      `https://dummyjson.com/products/${body.id}`,
      body
    );
  });

  it('should call HttpClient delete method with the correct URL and body for deleteProduct', () => {
    const body = { id: 1 };

    categoryService.deleteProduct('', body);

    expect(httpClientMock.delete).toHaveBeenCalledWith(
      `https://dummyjson.com/products/${body.id}`
    );
  });

  it('should call HttpClient post method with the correct URL and body for addProduct', () => {
    const body = { name: 'New Product' };

    categoryService.addProduct('', body);

    expect(httpClientMock.post).toHaveBeenCalledWith(
      `https://dummyjson.com/products/add`,
      body
    );
  });
});
