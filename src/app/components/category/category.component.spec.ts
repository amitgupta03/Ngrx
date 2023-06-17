import { CategoryFacade } from '../../store/category/category.facade';
import { CategoryComponent } from './category.component';
import { ProductFacade } from '../../store/product/product.facade';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let productFacade: ProductFacade;
  let categoryFacade: CategoryFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [CategoryComponent],
      providers: [CategoryFacade, ProductFacade],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    productFacade = TestBed.inject(ProductFacade);
    categoryFacade = TestBed.inject(CategoryFacade);
    component.categories = [
      { id: 1, active: false },
      { id: 2, active: false },
      { id: 3, active: false },
    ];
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call category() and loadCategories() and loadProduct() methods in ngOnInit()', () => {
    jest.spyOn(component, 'category');
    jest.spyOn(categoryFacade, 'loadCategories');
    jest.spyOn(productFacade, 'loadProduct');

    component.ngOnInit();

    expect(component.category).toHaveBeenCalled();
    expect(categoryFacade.loadCategories).toHaveBeenCalled();
    expect(productFacade.loadProduct).toHaveBeenCalled();
  });

  it('should set detailDataPass and showDetailPage correctly', () => {
    const data = {};
    component.detailsData(data);
    expect(component.showDetailPage).toBe(false);
  });

  it('should display Catgory', () => {
    const data = true;
    component.displayCatgory(data);
    expect(component.showDetailPage).toBe(true);
  });

  it('should reset showDetailPage and detailDataPass', () => {
    component.AddProduct();

    expect(component.showDetailPage).toBe(false);
    expect(component.detailDataPass).toBeNull();
  });

  it('should toggle the active property of the specified index and deactivate others', () => {
    const index = 1;

    component.toggleAccordion(index, component.categories);

    expect(component.categories[index].active).toBe(true);

    component.categories.forEach((object: any, i: any) => {
      if (i !== index) {
        expect(object.active).toBe(false);
      }
    });
  });

});
