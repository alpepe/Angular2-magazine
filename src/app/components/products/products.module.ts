import { NgModule } from "@angular/core";

import { CreateProductComponent } from './create-product/create-product.component'


// Modules
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        CreateProductComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CreateProductComponent
    ]
})

export class ProductsModule { }

