import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Checkout } from '../vm/checkout';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http:HttpClient) { }

  checkout(data:Checkout)
  {
    return this.http.post(`${environment.apiURL}/checkout`,data)
  }
}
