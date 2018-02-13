import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  public myOrders: Object[];
  constructor(private cartServise: CartService) { }

  ngOnInit() {
    this.cartServise.orderGet().subscribe(data => {
      this.myOrders = data.filter(d => d.username === localStorage.getItem('username'));
    }
    );
  }

}
