
// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutesModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

// Services
import { AuthGuard } from './core/guards/auth.guard.service';
import { AdminGuard } from './core/guards/admin.guard.service';
import { ServiceModule } from './core/services/services.module';
import { AuthModule } from './components/auth/auth.module';
import { SharedModule } from './components/shared/shraed.module';
import { ProductsModule } from './components/products/products.module';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutesModule,
    ServiceModule,
    AuthModule,
    SharedModule,
    ProductsModule
  ],
  providers: [
    AuthGuard,
    AdminGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
