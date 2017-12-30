import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AuthenticationService } from './auth.service';

const appKey = 'kid_HyfK-Babf'; // APP KEY HERE;
const appSecret = 'd8535aa4159f4ca6b753a07d1558ecbe'; // APP SECRET HERE;
const orderPostGetUrl = `https://baas.kinvey.com/appdata/${appKey}/orders/`;


@Injectable()
export class CartService {

    Products: Object[] = [];

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService
    ) { }

    takeProductToCart(product) {
        this.Products.push(product);
    }

    getProductOfCart() {
        return this.Products;
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
