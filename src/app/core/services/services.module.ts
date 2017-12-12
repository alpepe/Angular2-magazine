import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { allServices } from './index';

const appKey = 'kid_HyfK-Babf'; // APP KEY HERE;
const appSecret = 'd8535aa4159f4ca6b753a07d1558ecbe'; // APP SECRET HERE;

@NgModule({
    providers: [
        ...allServices
    ],
    imports: [
        CommonModule
    ]
})
export class ServiceModule { }

