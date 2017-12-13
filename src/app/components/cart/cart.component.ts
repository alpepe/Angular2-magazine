import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  private products: any[];
  private test: any[];
  private elForDelete: Object;
  private indexOfElForDel: number;
  private totalSum: number;

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
    if (this.products.length > 0) {
      for (let pr of this.products) {
        this.totalSum = this.totalSum + pr.price;
      }
      console.log(this.totalSum);
    }
  }



  /*ngOnDestroy() {
    this.subscription.unsubscribe();
  }*/



}