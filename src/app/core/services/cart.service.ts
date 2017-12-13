import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class CartService {

    Products: Object[] = [];

    constructor() { }

    takeProductToCart(product) {
        this.Products.push(product);
    }

    getProductOfCart() {
        return this.Products;
    }

}
