import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AuthenticationService } from './auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const appKey = 'kid_HyfK-Babf'; // APP KEY HERE;
const appSecret = 'd8535aa4159f4ca6b753a07d1558ecbe'; // APP SECRET HERE;
const orderPostGetUrl = `https://baas.kinvey.com/appdata/${appKey}/orders/`;


@Injectable()
export class CartService {

    public Products: any[];
    private productInCart = new BehaviorSubject<any>({});
    public productInCart$ = this.productInCart.asObservable();
    public elForDelete: Object;
    public indexOfElForDel: number;

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService,
        private router: Router
    ) {

        /*  ако има продукти в localStorage ги взимам в Products масива за да мога после с localStorage
            да взема следваща поръчка ако има, да я добавя пак към Products масива и накрая да добавя масива
            в localStorage */

        if (JSON.parse(localStorage.getItem('products'))) {
            this.Products = (JSON.parse(localStorage.getItem('products')));
        } else {
            this.Products = [];
        }
    }

    PutProductToCart(product) {
        localStorage.setItem(`products`, JSON.stringify(product));
        this.Products.push(JSON.parse(localStorage.getItem('products')));
        localStorage.setItem(`products`, JSON.stringify(this.Products));
        this.productInCart.next(this.Products);
    }

    getProductOfCart() {
        return JSON.parse(localStorage.getItem('products'));
    }

    getTotalSum() {
        let totalSum = 0;
        for (let pr of this.Products) {
            totalSum = totalSum + pr.product.price;
        }
        return totalSum;
    }

    deleteProduct(id, size) {
        this.elForDelete = this.Products.find(el => el.product._id === id && el.size === size);
        this.indexOfElForDel = this.Products.indexOf(this.elForDelete);
        this.Products.splice(this.indexOfElForDel, 1);
        localStorage.setItem('products', JSON.stringify(this.Products));
        this.productInCart.next(this.Products);
    }



    clearCart() {
        this.Products = [];
        localStorage.setItem('products', '[]');
        this.productInCart.next(this.Products);
    }

    orderPost(model: Object): Observable<any> {
        return this.http.post(
            orderPostGetUrl,
            JSON.stringify(model),
            {
                headers: {
                    'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    orderGet(): Observable<any> {
        return this.http.get(
            orderPostGetUrl,
            {
                headers: {
                    'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`
                }
            }
        );
    }

}
