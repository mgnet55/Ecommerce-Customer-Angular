import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UpdateCart } from '../vm/update-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  

  constructor(private http:HttpClient) {}

  
  getCart()
  {
    return this.http.get('http://localhost:8000/api/customer/cart')
  }
  updateCartItems(data:UpdateCart[])
  {
    return this.http.put(`http://localhost:8000/api/customer/cart`,data)
  }
  getCartInfo()
  {
    return this.http.get('http://localhost:8000/api/customer/cart/info')
  }
  setCartInfo(data:any)
  {
    return this.http.post('http://localhost:8000/api/customer/cart/info',data)
  }

  addItemToCart(id:number,data:any)
  {
    return this.http.post(`http://localhost:8000/api/customer/cart/${id}`,data)
  }
      
  deleteItemFromCart(id:number)
  {
    return this.http.delete(`http://localhost:8000/api/customer/cart/${id}`)
  }
  getCartItemsNumber()
  {
    return this.http.get(`http://localhost:8000/api/customer/cart/items`)
  }
}
