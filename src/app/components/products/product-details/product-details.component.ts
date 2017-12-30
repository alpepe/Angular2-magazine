import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public model: Object;
  public sizeForm: FormGroup;
  public sizeArr: string[];

  public targetProduct: string;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    const id: string = this.route.snapshot.params["id"];

    this.productService.getById().subscribe(data => {
      this.targetProduct = data.find(o => o._id === id);
      this.sizeArr = this.targetProduct.size.split(" ");

      this.sizeForm = this.formBuilder.group({
        size: this.sizeArr[0],
      });

      this.model = {
        productName: this.targetProduct.productName,
        imageUrl: this.targetProduct.imageUrl,
        price: this.targetProduct.price,
        color: this.targetProduct.color,
        size: this.sizeForm.value.size,
        categories: this.targetProduct.categories,
        moreInfo: this.targetProduct.moreInfo
      };
      console.log(this.model);
    });

  }

  addToCart() {

    this.cartService.takeProductToCart(this.model);
    console.log("OREDER" + this.model)
  }



}
