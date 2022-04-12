import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes =[
  {path:'', redirectTo: 'profile', pathMatch:'full'},
  {path:'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  // {path: 'EditProfile', component:EditUserProfileComponent, canActivate: [AuthGuard]}
]


@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
