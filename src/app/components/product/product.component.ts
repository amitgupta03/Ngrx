import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductFacade } from 'src/app/store/product/product.facade';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnChanges {
  contactForm!: FormGroup;
  @Output() valueChange = new EventEmitter();
  showEdit = true;
  actionPerformed: any;
  constructor(
    private productFacade: ProductFacade,
    private formBuilder: FormBuilder
  ) {}

  @Input() productDetails: any;
  @Input() addProduct: boolean = false;

  ngOnInit() {}
  ngOnChanges() {
    this.createContactForm();

    if (!this.productDetails) {
      this.editPage();
    } else {
      this.updateProfile();
    }
  }

  createContactForm() {
    this.contactForm = this.formBuilder.group({
      title: [''],
      description: [''],
      price: [''],
      rating: [''],
      stock: [''],
      discountPercentage: [''],
      brand: [''],
      category: this.addProduct ? ['', Validators.required] : [''],
      thumbnail: [''],
    });
  }

  updateProfile() {
    this.contactForm.patchValue({
      title: this.productDetails.title,
      description: this.productDetails.description,
      price: this.productDetails.price,
      rating: this.productDetails.rating,
      stock: this.productDetails.stock,
      discountPercentage: this.productDetails.discountPercentage,
      brand: this.productDetails.brand,
      category: this.addProduct ? this.productDetails.category : '',
      thumbnail: this.productDetails.thumbnail
    });
  }

  valueChanged() {
    this.valueChange.emit(true);
    this.productFacade.updateProduct({...this.productDetails, actionType: this.actionPerformed});
  }

  editPage() {
    this.showEdit = false;
  }

  deleteProduct() {
    this.productFacade.deleteProduct({
      id: this.productDetails ? this.productDetails.id : this.enableEditMode(),
    });
    this.actionPerformed='delete';
    alert('Product Have beed Deleted Successfully!');
  }

  updateProduct() {
    this.productDetails = {
      ...this.productDetails,
      title: this.contactForm.value.title,
      description: this.contactForm.value.description,
      price: this.contactForm.value.price,
      rating: this.contactForm.value.rating,
      stock: this.contactForm.value.stock,
      discountPercentage: this.contactForm.value.discountPercentage,
     
    };
    this.showEdit = true;
    this.actionPerformed = 'update';
  }

  addNewProduct() {
    const newProduct = {
      brand: this.contactForm.value.brand,
      category: this.contactForm.value.category,
      thumbnail: this.contactForm.value.thumbnail,
      id: '',
      title: this.contactForm.value.title,
      description: this.contactForm.value.description,
      price: this.contactForm.value.price,
      rating: this.contactForm.value.rating,
      stock: this.contactForm.value.stock,
      discountPercentage: this.contactForm.value.discountPercentage,
    };
    this.productFacade.addProduct(newProduct);
    console.log(this.contactForm.value);
    this.actionPerformed='add';
    this.addProduct = false;
    this.showEdit = true;
  }

  enableEditMode() {
    this.addProduct = false;
    this.showEdit = true;
  }

  loadFile(event:any) {
    var reader = new FileReader();
    reader.onload = function(){
      var output:any = document.getElementById('output');
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}
