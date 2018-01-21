import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AuthenticationService } from './auth.service';
import { Router } from '@angular/router';

const appKey = 'kid_HyfK-Babf'; // APP KEY HERE;
const appSecret = 'd8535aa4159f4ca6b753a07d1558ecbe'; // APP SECRET HERE;
const orderPostGetUrl = `https://baas.kinvey.com/appdata/${appKey}/orders/`;


@Injectable()
export class CartService {

    Products: Object[];

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

    takeProductToCart(product) {

        localStorage.setItem(`products`, JSON.stringify(product));
        this.Products.push(JSON.parse(localStorage.getItem('products')));
        localStorage.setItem(`products`, JSON.stringify(this.Products));
    }

    getProductOfCart() {
        return JSON.parse(localStorage.getItem('products'));
    }
    clearCart() {
        this.Products = [];
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
