import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profileData:User[] = []

  constructor(private authService:AuthService) { }

  ngOnInit(): void {

    this.authService.myProfile().subscribe(res=>{
      console.log(res.data);


      let userModel = {
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
        address: res.data.address,
       }
       this.profileData.push(userModel);
    })
  }

}
