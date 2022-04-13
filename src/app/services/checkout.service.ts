import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Checkout } from '../vm/checkout';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http:HttpClient) { }

  checkout(data:Checkout)
  {
    return this.http.post('http://localhost:8000/api/checkout',data,{headers:{"Authorization":'Bearer 1|yKNMrcR0HIvXxrsHEjIqIAaHmt0DjXj9BkxcViW9'}})
  }
}
