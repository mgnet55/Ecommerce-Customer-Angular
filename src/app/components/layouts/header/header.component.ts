import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartItems:any
  constructor(private cartSevice:CartService) { }

  ngOnInit(): void {
    this.cartSevice.getItemsNumber().subscribe(
      data=>this.cartItems=data
    )
  }

}
