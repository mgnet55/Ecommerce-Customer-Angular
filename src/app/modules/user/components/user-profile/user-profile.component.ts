import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profileData:User[] = []
 user : User = {} as User;
  constructor(private authService:AuthService,
              private Router:Router) { }

  ngOnInit(): void {

    this.authService.myProfile().subscribe(res=>{
      console.log(res.data);
      this.user = res.data;
      let userModel = {
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
        address: res.data.address,
        city:res.data.city.name,
        governate:res.data.city.governate.name
       }
       this.profileData.push(userModel);
    },error=>{
        //  this.Router.navigate(['/login','You Should Login'])
    })
  }

}
