import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartItems:any;
  loginStatus:boolean
  constructor(private cartSevice:CartService,
              private AuthService:AuthService,
              private Router:Router) {
                this.loginStatus = this.AuthService.loginStatus;
                console.log(this.loginStatus);
               }

  ngOnInit(): void {
    this.cartSevice.getItemsNumber().subscribe(
      data=>this.cartItems=data
    )

    this.AuthService.isUserLoggedSubject().subscribe(status=>{
      this.loginStatus = status
    })
  }

  logout(){
    this.AuthService.logout();
    localStorage.removeItem('userToken');
    this.Router.navigate(['home']);
  }

}
