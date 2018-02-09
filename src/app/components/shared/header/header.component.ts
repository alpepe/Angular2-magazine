import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logoImagePath: string;
  cartImagePath: string;

  constructor(public authService: AuthenticationService) {
    this.logoImagePath = "../../../../../assets/images/LOGO1.png";
    this.cartImagePath = "../../../../../assets/images/glossy-black-icon-business.png";
  }

  ngOnInit() {
  }

}
