import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { AuthenticationService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public model;
  public currentProductId: string;
  public targetProduct: string;
  private currectOrder: boolean;
  private delConfirmInvisible = true;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private authServise: AuthenticationService
  ) {
    this.currectOrder = true;
    this.currentProductId = this.route.snapshot.params["id"];
    this.productService.getById().subscribe(data => {
      this.targetProduct = data.find(o => o._id === this.currentProductId);
      this.model = {
        product: this.targetProduct,
        size: "Select size of product"
        // imageUrl: "this.targetProduct.imageUrl",
        // price: "this.targetProduct.price",
        // color: "this.targetProduct.color",
        // categories: "this.targetProduct.categories",
        // moreInfo: "this.targetProduct.moreInfo"
      };
    });
  }

  ngOnInit() {
  }

  addToCart() {
    if (this.model.size !== "Select size of product") {
      this.currectOrder = true;
      this.cartService.takeProductToCart(this.model);
    } else {
      this.currectOrder = false;
    }

  }

  deleteProduct() {
    this.delConfirmInvisible = false;
  }

  ConfirmDeleteProduct() {
    this.delConfirmInvisible = true;
    this.productService.deleteProduct(this.currentProductId).subscribe(data => {
      this.router.navigate(['/home']);
    });
  }

  notConfirmDelete() {
    this.delConfirmInvisible = true;
  }



}
