import {Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Order} from 'src/app/models/order';
import {OrderService} from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Order[] = []
  page = 1;
  itemsPerPage = 30;
  totalItems: any;

  constructor(private orderService: OrderService,
    private titleService: Title) {
    this.titleService.setTitle('My Orders')
      
  }

  ngOnInit(): void {
    this.getPage(this.page)
  }

  getPage(page: any) {
    this.orderService.myOrders(+page).subscribe(res => {
      this.orders = res.data.data;
      this.itemsPerPage = res.data.per_page;
      this.totalItems = res.data.total;
      this.page = res.data.current_page

    })

  }
}
