import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  public products: string[];
  public currentPage: Number;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    });
    this.currentPage = 1;
  }

  viewDetails(product) {
    this.router.navigate([`details/${product._id}`]);
  }

}
