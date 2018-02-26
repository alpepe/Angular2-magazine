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

  public foundProduct: boolean;
  public filterObj: Object;
  public category: string;
  public color: string;
  public test = true;
  public categoryHide = true;
  public colorHide = true;


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
    this.router.navigate(['/home']);
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
  categoryShowHide() {
    this.categoryHide = !this.categoryHide;
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
  colorShowHide() {
    this.colorHide = !this.colorHide;
  }

}
