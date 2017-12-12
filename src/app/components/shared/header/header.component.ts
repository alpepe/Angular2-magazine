import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  fullImagePath: string;

  constructor(private authService: AuthenticationService) {
    this.fullImagePath = "../../../../../assets/images/LOGO1.png";
  }

  ngOnInit() {
  }

}
