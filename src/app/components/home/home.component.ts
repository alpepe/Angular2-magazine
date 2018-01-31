import { Component } from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public username: string;

  constructor() {
    this.username = localStorage.getItem('username');
  }
}
