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

  constructor(private cartSevice:CartService,
              public AuthService:AuthService,
              private Router:Router) {
               
               }

  ngOnInit(): void {
    
  }

  logout(){
    localStorage.removeItem('userToken');
    this.AuthService.cartItem=0
    this.Router.navigate(['home']);
  }

}
