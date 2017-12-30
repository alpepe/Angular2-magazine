import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  public productForm: FormGroup;
  public categories: string[];
  public urlPatern;

  public productNameMessage: string;
  public imageUrlMessage: string;
  public priceMessage: string;

  public selectedCategory: string;

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private router: Router) {
    this.categories = ['clothes', 'accessories', 'shoes'];
    this.urlPatern = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  }

  categoryOnChange(value) {
    this.selectedCategory = value;
    console.log(this.selectedCategory);
  }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      //productName: {value: 'Nike Air max', disabled: true},
      productName: ['Nike Air max', [Validators.minLength(10), Validators.required]],
      imageUrl: ['https://cdn.thesolesupplier.co.uk/2017/09/Nike-Air-Max-90-Ultra-Essential-Gym-Red.png',
        [Validators.pattern(this.urlPatern)]],
      price: [200, [Validators.required]],
      color: 'red',
      size: '44',
      categories: this.categories[0],
      moreInfo: 'Product #: 18356600Noble Red/Port Wine/Summit White | Width - D - Medium'
    });

    const productNameControl = this.productForm.get('productName');
    const imageUrlControl = this.productForm.get('imageUrl');
    const priceControl = this.productForm.get('price');


    productNameControl.valueChanges.subscribe(value => {
      this.productNameMessage = this.setMessage(productNameControl);
    });
    imageUrlControl.valueChanges.subscribe(value => {
      this.imageUrlMessage = this.setMessage(imageUrlControl);
    });
    priceControl.valueChanges.subscribe(value => {
      this.priceMessage = this.setMessage(priceControl);
    });

  }

  setMessage(c: AbstractControl): string {
    this.productNameMessage = '';
    this.imageUrlMessage = '';
    this.priceMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      if (c.errors.required) {
        return 'Input is required';
      }
      if (c.errors.minlength) {
        return 'Input shoild be at least 10 symbols long';
      }
      if (c.errors.pattern) {
        return 'image must be a link';
      }
    }
  }

  save(): void {
    this.productService.createProduct(this.productForm.value).subscribe(data => {
      console.log(data);
      this.productForm = this.formBuilder.group({
        //productName: {value: 'Nike Air max', disabled: true},
        productName: '',
        imageUrl: '',
        price: '',
        color: '',
        size: '',
        categories: this.categories[0],
        moreInfo: ''
      });
      this.router.navigate(['home']);
    });
  }

}
