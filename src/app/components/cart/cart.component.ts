import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  private products: Object[];
  private test: any[];
  private elForDelete: Object;
  private indexOfElForDel: number;
  private totalSum: number;
  public orderObject: Object;

  constructor(private cartService: CartService) {
    this.products = cartService.getProductOfCart();
    this.calculateTotalSum();

  }

  deleteProductFromCart(id): void {
    this.elForDelete = this.products.find(el => el._id === id);
    this.indexOfElForDel = this.products.indexOf(this.elForDelete);
    this.products.splice(this.indexOfElForDel, 1);
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
