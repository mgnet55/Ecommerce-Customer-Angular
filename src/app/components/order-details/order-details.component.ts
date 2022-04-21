import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order = {}
  orderID : number = 0
  constructor(private orderService:OrderService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      this.orderID = (paramMap.get('ID'))?Number(this.activatedRoute.snapshot.paramMap.get('ID')):0;

      console.log(this.orderID)
        this.orderService.orderDetails(this.orderID).subscribe(data=>{
          this.order = data;
        },err=>{
          console.log(err)
        })
      })

  }

}
