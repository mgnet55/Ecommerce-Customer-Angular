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
      'Content-Type': 'application/json','Accept':' */*'
      ,'Authorization': 'Bearer 1|yKNMrcR0HIvXxrsHEjIqIAaHmt0DjXj9BkxcViW9'
      })};
  }

  getCart()
  {
    return this.http.get('http://localhost:8000/api/cart',this.httpOptions)
  }
  updateCartItems(data:UpdateCart[])
  {
    
    let value=this.http.put(`http://localhost:8000/api/cart`,data,this.httpOptions)
    value.subscribe(data=>{
      this.getCartItemsNumber().subscribe((data:any)=>{
        console.log(data)
        this.itemsNumber.next(data)
      })
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
  addItemToCart(id:number)
  {
    let value=this.http.post(`http://localhost:8000/api/cart/${id}`,this.httpOptions)
    value.subscribe(data=>{
      this.getCartItemsNumber().subscribe((data:any)=>{
        this.itemsNumber.next(data)
        console.log(data)
      })
    })
    return value;
  }
  deleteItemFromCart(id:number)
  {
    let value=this.http.delete(`http://localhost:8000/api/cart/${id}`,this.httpOptions)
    value.subscribe(data=>{
      console.log('delete')
      this.getCartItemsNumber().subscribe((data:any)=>{
        this.itemsNumber.next(data)
      })
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
