import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FilesModule } from 'src/app/shared/files/files.module';


const routes: Routes =[
  {path:'', redirectTo: 'profile', pathMatch:'full'},
  {path:'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
   {path: 'edit', component:EditProfileComponent, canActivate: [AuthGuard]},
   {path: 'edit/:error', component:EditProfileComponent, canActivate: [AuthGuard]}
]


@NgModule({
  declarations: [
    UserProfileComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FilesModule,
  ]
})
export class UserModule { }
