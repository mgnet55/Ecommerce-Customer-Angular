import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdateCart } from '../vm/update-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  

  constructor(private http:HttpClient) {}

  
  getCart()
  {
    return this.http.get(`${environment.apiCustomerURL}/cart`)
  }
  updateCartItems(data:UpdateCart[])
  {
    return this.http.put(`${environment.apiCustomerURL}/cart`,data)
  }
  getCartInfo()
  {
    return this.http.get(`${environment.apiCustomerURL}/cart/info`)
  }
  setCartInfo(data:any)
  {
    return this.http.post(`${environment.apiCustomerURL}/cart/info`,data)
  }

  addItemToCart(id:number,data:any)
  {
    return this.http.post(`${environment.apiCustomerURL}/cart/${id}`,data)
  }
      
  deleteItemFromCart(id:number)
  {
    return this.http.delete(`${environment.apiCustomerURL}/cart/${id}`)
  }
  getCartItemsNumber()
  {
    return this.http.get(`${environment.apiCustomerURL}/cart/items`)
  }
}
