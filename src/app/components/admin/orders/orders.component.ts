import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public orders: Object[];
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.orderGet().subscribe(data => {
      console.log(data);
      this.orders = data;
    });
  }

}
