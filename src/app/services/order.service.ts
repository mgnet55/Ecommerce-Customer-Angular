import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient) { }


  myOrders(page:number):Observable<any>{
    return this.httpClient.get<any>(`${environment.apiCustomerURL}/orders?page=${page}`);
  }

  orderDetails(ID:number):Observable<any>{
    return this.httpClient.get<any>(`${environment.apiCustomerURL}/orders/${ID}`);
  }
}
