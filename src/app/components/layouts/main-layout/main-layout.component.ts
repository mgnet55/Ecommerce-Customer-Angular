import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  loginStatus:boolean
  constructor(private AuthService:AuthService) {
    this.loginStatus = this.AuthService.loginStatus;
    console.log(this.loginStatus);
   }

  ngOnInit(): void {
    // this.AuthService.isUserLoggedSubject().subscribe(status=>{
    //   this.loginStatus = status
    // })
  }

}
