import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  public products: any[];
  private test: any[];
  private elForDelete: Object;
  private indexOfElForDel: number;
  private totalSum: number;
  public orderObject: Object;
  private delConfirmInvisible = true;

  constructor(private cartService: CartService) {
    this.products = cartService.getProductOfCart();
    this.calculateTotalSum();

  }

  deleteProductFromCart(): void {
    this.delConfirmInvisible = false;
  }
  confirmDelProduct(id, size): void {
    this.elForDelete = this.products.find(el => el.product._id === id && el.size === size);
    this.indexOfElForDel = this.products.indexOf(this.elForDelete);
    this.products.splice(this.indexOfElForDel, 1);
    localStorage.setItem('products', JSON.stringify(this.products));
    this.cartService.Products = this.products;
    this.calculateTotalSum();
  }

  calculateTotalSum(): void {
    this.totalSum = 0;
    if (this.products) {
      for (let pr of this.products) {
        this.totalSum = this.totalSum + pr.product.price;
      }
      console.log(this.totalSum);
    }
  }

  order(products) {
    this.orderObject = {
      username: localStorage.getItem('username'),
      products: products,
      finalPrice: this.totalSum
    };
    this.cartService.orderPost(this.orderObject).subscribe(data => {
      (console.log(data));
      this.products = [];
      this.cartService.clearCart();
    });
  }



  /*ngOnDestroy() {
    this.subscription.unsubscribe();
  }*/



}
