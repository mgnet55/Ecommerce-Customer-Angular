import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import {environment} from "src/environments/environment";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  imagesURL:string = environment.images
  profileData:User[] = []
 user : User = {} as User;
  constructor(private authService:AuthService,
              private Router:Router) { }

  ngOnInit(): void {

    this.authService.myProfile().subscribe((res:any)=>{
      console.log(res.data);
      this.user = res.data;

    },error=>{
        //  this.Router.navigate(['/login','You Should Login'])
    })
  }

}
