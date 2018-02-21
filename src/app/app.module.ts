
// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutesModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';// добавям го за да работят пътищата след деплойване
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';

// Services
import { AuthGuard } from './core/guards/auth.guard.service';
import { AdminGuard } from './core/guards/admin.guard.service';
import { ServiceModule } from './core/services/services.module';
import { AuthModule } from './components/auth/auth.module';
import { SharedModule } from './components/shared/shraed.module';
import { ProductsModule } from './components/products/products.module';
import { AdminModule } from './components/admin/admin.module';





// import alert service and component


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutesModule,
    ServiceModule,
    AuthModule,
    SharedModule,
    ProductsModule,
    AdminModule,
    RouterModule,
    ToastrModule.forRoot(), // ToastrModule added
    BrowserAnimationsModule, // required animations module
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    { provide: LocationStrategy, useClass: HashLocationStrategy }, // добавям го за да работят пътищата след деплойване
    { provide: APP_BASE_HREF, useValue: '/' }

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
