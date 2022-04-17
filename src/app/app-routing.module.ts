import { ProductsComponent } from './components/products/products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'cart', component: CartComponent,canActivate:[AuthGuard]},
      { path: 'home/:username', component: HomeComponent },
      {
        path: 'user',
        loadChildren: () => import('src/app/modules/user/user.module').then(m => m.UserModule)
      },
      { path: 'login', component: LoginComponent },
      { path: 'login/:error', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'register/:error', component: RegisterComponent },
      { path: 'product/:ID', component: ProductDetailsComponent },

    ]
  },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
