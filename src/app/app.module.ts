import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { LoginComponent } from './components/auth/login/login.component';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './components/auth/register/register.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AccountManagementComponent } from './components/account-management/account-management.component';
import { FilesModule } from './shared/files/files.module';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';

import { LoadingComponent } from './shared/loading/loading.component';
import { LoaderInterceptorService } from './interceptors/loader-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptorService } from './interceptors/error-interceptor.service';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import {NgxPaginationModule} from "ngx-pagination";
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    MainLayoutComponent,
    RegisterComponent,
    NotFoundComponent,
    ProductComponent,
    ProductsComponent,
    CartComponent,
    CarouselComponent,
    DropdownComponent,
    ProductDetailsComponent,
    AccountManagementComponent,
        LoadingComponent,
        OrderComponent,
        OrderDetailsComponent,
        AboutUsComponent,
        ContactUsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TooltipModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    FilesModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    NgxPaginationModule,
    ModalModule.forRoot()
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:LoaderInterceptorService,
      multi:true
    },{
      provide:HTTP_INTERCEPTORS,
      useClass:ErrorInterceptorService,
      multi:true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
