import { NgModule } from "@angular/core";


// Modules
import { CommonModule } from '@angular/common';

// Components
import { OrdersComponent } from "./orders/orders.component";




@NgModule({
    declarations: [
        OrdersComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OrdersComponent
    ]
})

export class AdminModule { }

