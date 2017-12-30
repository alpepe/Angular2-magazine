import { NgModule } from "@angular/core";

import { CreateProductComponent } from './create-product/create-product.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserOrdersComponent } from "./user-orders/user-orders.component";


// Modules
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';





@NgModule({
    declarations: [
        CreateProductComponent,
        ProductComponent,
        ProductListComponent,
        ProductDetailsComponent,
        UserOrdersComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        CreateProductComponent,
        ProductComponent,
        ProductListComponent,
        ProductDetailsComponent,
        UserOrdersComponent
    ]
})

export class ProductsModule { }

