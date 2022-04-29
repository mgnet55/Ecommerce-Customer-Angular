import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import {environment} from "src/environments/environment";
import {Order} from "../../models/order";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  images = environment.images
  order: Order | undefined
  orderID : number = 0
  constructor(private orderService:OrderService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) {
      this.titleService.setTitle('Order-Detalis')
      
     }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      this.orderID = (paramMap.get('ID'))?Number(this.activatedRoute.snapshot.paramMap.get('ID')):0;

      console.log(this.orderID)
        this.orderService.orderDetails(this.orderID).subscribe(res=>{
          this.order = res.data;
        },err=>{
          console.log(err)
        })
      })

  }

}
