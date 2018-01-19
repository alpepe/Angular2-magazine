import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { ItemModel } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public model: ItemModel;
  public targetProduct: string;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
  ) {
    this.model = new ItemModel('', '', 0, '', '', '', '');
    const id: string = this.route.snapshot.params["id"];
    this.productService.getById().subscribe(data => {
      this.targetProduct = data.find(o => o._id === id);
      if (this.targetProduct) {
        this.model = {
          product: this.targetProduct,
          // imageUrl: "this.targetProduct.imageUrl",
          // price: "this.targetProduct.price",
          // color: "this.targetProduct.color",
          // categories: "this.targetProduct.categories",
          // moreInfo: "this.targetProduct.moreInfo"
        };
      }
    });
  }

  ngOnInit() {




  }

  addToCart() {

    this.cartService.takeProductToCart(this.model);
    console.log(this.model);
  }



}
