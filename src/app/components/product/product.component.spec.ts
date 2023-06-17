import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductComponent } from './product.component';
import { ProductFacade } from '../../store/product/product.facade';
import { StoreModule } from '@ngrx/store';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productFacade: ProductFacade;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, StoreModule.forRoot({})],
      declarations: [ProductComponent],
      providers: [ProductFacade, FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    productFacade = TestBed.inject(ProductFacade);
    formBuilder = TestBed.inject(FormBuilder);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call editPage() when productDetails is falsy', () => {
    const spy = jest.spyOn(component, 'editPage');
    component.ngOnChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should call updateProfile() when productDetails is truthy', () => {
    component.productDetails = {}; // Set productDetails to a truthy value
    const spy = jest.spyOn(component, 'updateProfile');
    component.ngOnChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should create the contactForm with category as optional when addProduct is false', () => {
    component.addProduct = false;
    component.createContactForm();
    expect(component.contactForm).toBeTruthy();
    expect(component.contactForm.get('category')).toBeTruthy();
    expect(component.contactForm.get('category')?.validator).toBeFalsy();
  });

  it('should create the contactForm with category as required when addProduct is true', () => {
    component.addProduct = true;
    component.createContactForm();
    expect(component.contactForm).toBeTruthy();
    expect(component.contactForm.get('category')).toBeTruthy();
    expect(component.contactForm.get('category')?.validator).toEqual(
      Validators.required
    );
  });

  it('should update the contactForm with product details', () => {
    component.productDetails = {
      title: 'Test Title',
      description: 'Test Description',
      price: 10.99,
      rating: 4.5,
      stock: 100,
      discountPercentage: 0,
      brand: 'Test Brand',
      category: '',
      thumbnail: 'test-thumbnail.jpg',
    };
    component.addProduct = false;
    component.createContactForm();
    component.updateProfile();
    expect(component.contactForm).toBeTruthy();
    expect(component.contactForm.value).toMatchObject(component.productDetails);
  });

  it('should emit valueChange event and call productFacade.updateProduct() in valueChanged()', () => {
    const spy = jest.spyOn(component.valueChange, 'emit');
    const spyProductFacade = jest.spyOn(productFacade, 'updateProduct');

    component.valueChanged();

    expect(spy).toHaveBeenCalledWith(true);
    expect(spyProductFacade).toHaveBeenCalledWith({
      ...component.productDetails,
      actionType: component.actionPerformed,
    });
  });

  it('should set showEdit to false in editPage()', () => {
    component.editPage();
    expect(component.showEdit).toBe(false);
  });

  it('should call productFacade.deleteProduct() and set actionPerformed to "delete" in deleteProduct()', () => {
    const productId = 'testProductId';
    component.productDetails = { id: productId };
    const spy = jest.spyOn(productFacade, 'deleteProduct');
    component.deleteProduct();
    expect(spy).toHaveBeenCalledWith({ id: productId });
    expect(component.actionPerformed).toBe('delete');
  });

  it('should update productDetails, set showEdit to true, and set actionPerformed to "update" in updateProduct()', () => {
    const formValues = {
      title: 'Test Title',
      description: 'Test Description',
      price: 9.99,
      rating: 4.5,
      stock: 10,
      discountPercentage: 0.1,
    };
    component.contactForm = formBuilder.group(formValues);

    component.updateProduct();
    expect(component.productDetails).toEqual({
      ...component.productDetails,
      ...formValues,
    });
    expect(component.showEdit).toBe(true);
    expect(component.actionPerformed).toBe('update');
  });
  it('should call productFacade.addProduct() and set actionPerformed, addProduct, and showEdit in addNewProduct()', () => {
    const formValues = {
      id:'',
      brand: 'Test Brand',
      category: 'Test Category',
      thumbnail: 'Test Thumbnail',
      title: 'Test Title',
      description: 'Test Description',
      price: 9.99,
      rating: 4.5,
      stock: 10,
      discountPercentage: 0.1,
    };
    component.contactForm = formBuilder.group(formValues);
    jest.spyOn(productFacade, 'addProduct');
    component.addNewProduct();
    expect(productFacade.addProduct).toHaveBeenCalledWith(formValues);
    expect(component.actionPerformed).toBe('add');
    expect(component.addProduct).toBe(false);
    expect(component.showEdit).toBe(true);
  });

  it('should set addProduct to false and showEdit to true in enableEditMode()', () => {
    component.enableEditMode();

    expect(component.addProduct).toBe(false);
    expect(component.showEdit).toBe(true);
  });
});
