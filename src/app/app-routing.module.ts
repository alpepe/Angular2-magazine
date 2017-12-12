import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { RegisterFormComponent } from './components/auth/register-form/register-form.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/auth/logout-component/logout.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';

// Guards
import { AuthGuard } from './core/guards/auth.guard.service';
import { AdminGuard } from './core/guards/admin.guard.service';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'createProduct', canActivate: [AdminGuard], component: CreateProductComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'details/:id', canActivate: [AuthGuard], component: ProductDetailsComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule { }
