import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../models/city';
import { Governate } from '../models/governate';
import { User } from '../models/user';
import { CartService } from './cart.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser:User={} as User
  public cartItem=0
  constructor(private httpClient:HttpClient,private cart:CartService
  ) {}


  login(data:object):Observable<any>{
    return this.httpClient.post(`${environment.apiCustomerURL}/login`,JSON.stringify(data))
   }
   prepareUserData() {

    if (this.loginStatus) {
      this.myProfile().subscribe((resUser:any) => {
        this.currentUser.email = resUser.data.email;
      });
      this.cart.getCartItemsNumber().subscribe((res:any)=>{
        this.cartItem=res.data
      })
    }
  }

  logout(){
    localStorage.removeItem('userToken')
  }
  get loginStatus(): boolean
  {
    return  (localStorage.getItem('userToken'))? true: false
  }
  register(data:object):Observable<any>{
    return this.httpClient.post(`${environment.apiCustomerURL}/register`,data)
   }

   myProfile():Observable<User>{
    return this.httpClient.get<User>(`${environment.apiURL}/myProfile`)
   }

   cities(cityID:number):Observable<City[]>{
    return this.httpClient.get<City[]>(`${environment.apiURL}/governorate/${cityID}`)
   }

   governates():Observable<Governate[]>{
    return this.httpClient.get<Governate[]>(`${environment.apiURL}/governorate`)
   }

   editProfile(data:object):Observable<any>{
    return this.httpClient.post(`${environment.apiURL}/editprofile`,data)
   }
   getToken()
   {
     return localStorage.getItem('userToken')||''
   }
}
