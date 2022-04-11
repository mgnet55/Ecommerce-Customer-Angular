import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';

const routes: Routes = [
  {path: '' , component: MainLayoutComponent, children:[
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path:'home', component: HomeComponent},
    {path:'home/:username', component: HomeComponent},
    {
      path: 'user',
      loadChildren: () => import('src/app/modules/user/user.module').then(m => m.UserModule)
    },
  ]},
  {path:'login', component:LoginComponent},
   {path: 'register', component: RegisterComponent},
  {path: '**',component:NotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
