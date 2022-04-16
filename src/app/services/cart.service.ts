import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UpdateCart } from '../vm/update-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private httpOptions = {};
  private itemsNumber:BehaviorSubject<number>
  private inialvalueItems:number=0
  constructor(private http:HttpClient) {
    this.itemsNumber= new BehaviorSubject<number>(this.inialvalueItems);
    this.httpOptions =  {headers: new HttpHeaders({
      'Content-Type': 'application/json','Accept':'application/json'
      ,'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      })};
  }

  getCart()
  {
    return this.http.get('http://localhost:8000/api/cart',this.httpOptions)
  }
  updateCartItems(data:UpdateCart[])
  {

    let value=this.http.put(`http://localhost:8000/api/cart`,data,this.httpOptions)
    value.subscribe((data:any)=>{
        this.itemsNumber.next(data.data.totalQuantity)
      })
    return value;
  }
  getCartInfo()
  {
    return this.http.get('http://localhost:8000/api/cart/info',this.httpOptions)
  }
  setCartInfo(data:any)
  {
    return this.http.post('http://localhost:8000/api/cart/info',data,this.httpOptions)
  }

  addItemToCart(id:number,data:any)
  {
    let value=this.http.post(`http://localhost:8000/api/cart/${id}`,data,this.httpOptions)
    value.subscribe((data:any)=>{
        this.itemsNumber.next(data.data.totalQuantity)

    })
    return value;
  }
      
  deleteItemFromCart(id:number)
  {
    let value=this.http.delete(`http://localhost:8000/api/cart/${id}`,this.httpOptions)
    value.subscribe((data:any)=>{  
        this.itemsNumber.next(data.data.totalQuantity)
    })
    return value;
  }
  getCartItemsNumber()
  {
    return this.http.get(`http://localhost:8000/api/cart/items`,this.httpOptions)
  }
  inialvalue()
  {
    this.http.get(`http://localhost:8000/api/cart/items`,this.httpOptions).subscribe(
      (data:any)=>this.inialvalue=data
    )
  }
  getItemsNumber()
  {
    return this.itemsNumber.asObservable()
  }
}
