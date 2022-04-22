import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders :Order[]= []

  constructor(private orderService:OrderService) { }

  ngOnInit(): void {

    this.orderService.myOrders().subscribe(data=>{
      this.orders = data;
      console.log(this.orders)
    })
  }

  
}
