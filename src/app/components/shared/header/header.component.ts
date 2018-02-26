import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public logoImagePath: string;
  public cartImagePath: string;
  public numberOfProducts: number;
  public totalSum: number;
  private products: any[];
  private username: string;
  public showHideMenu: boolean;

  constructor(public authService: AuthenticationService, public cartService: CartService) {
    this.logoImagePath = "assets/images/sport_sector.png";
    this.cartImagePath = "assets/images/glossy-black-icon-business.png";
    this.products = this.cartService.getProductOfCart();
    this.totalSum = this.cartService.getTotalSum();
    this.showHideMenu = true;
  }

  ngOnInit() {
    this.cartService.productInCart$.subscribe(data => {
      console.log(data);
      this.totalSum = this.cartService.getTotalSum();
      if (this.cartService.getProductOfCart()) {
        this.numberOfProducts = this.cartService.getProductOfCart().length;
      } else {
        this.numberOfProducts = 0;
      }
    });

    this.authService.username$.subscribe(data => {
      this.username = localStorage.getItem('username');
    });
  }

  showHudeMenu() {
    this.showHideMenu = !this.showHideMenu;
  }

}
