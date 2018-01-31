import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  public products: string[];
  public currentPage: Number;

  private foundProduct: boolean;
  private filterObj: Object;
  private category: string;
  private color: string;
  private test = true;


  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.filterObj = {};
    this.category = "";
    this.color = "";
    this.foundProduct = true;
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.productService.getAllProducts(JSON.stringify(params)).subscribe(data => {
        //проверявам дали има поне 1 продукт с зададените филтри, ако не изкарвам съобщение.
        if (data.length === 0) {
          this.foundProduct = false;
        } else {
          this.foundProduct = true;
        }
        this.products = data;
      });
    });
  }


  viewDetails(product) {
    this.router.navigate([`details/${product._id}`]);
  }

  categoryFilter() {
    if (this.filterObj['categories'] === this.category) {
      delete this.filterObj['categories'];
    } else { this.filterObj['categories'] = this.category; }

    this.router.navigate(['/home'], { queryParams: this.filterObj });
  }
  categoryClear() {
    if (this.filterObj['categories'] === this.category) {
      this.category = "";
      delete this.filterObj['categories'];
      this.router.navigate(['/home'], { queryParams: this.filterObj });
    }
  }

  colorFilter() {
    this.filterObj['color'] = this.color;
    this.router.navigate(['/home'], { queryParams: this.filterObj });
  }
  colorClear() {
    if (this.filterObj['color'] === this.color) {
      this.color = "";
      delete this.filterObj['color'];
      this.router.navigate(['/home'], { queryParams: this.filterObj });
    }
  }

}
