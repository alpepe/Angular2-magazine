import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public targetProduct: string;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit() {
    const id: string = this.route.snapshot.params["id"];

    this.productService.getById().subscribe(data => {
      this.targetProduct = data.find(o => o._id === id);
    });
  }

  addToCart() {
    this.cartService.takeProductToCart(this.targetProduct);
  }

}
