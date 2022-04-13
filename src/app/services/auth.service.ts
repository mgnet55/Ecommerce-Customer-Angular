import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedSubject : BehaviorSubject<boolean>;
  private httpOptions = {};
  constructor(private httpClient:HttpClient
  ) {
    this.httpOptions =  {headers: new HttpHeaders({
      'Content-Type': 'application/json','Accept':'application/json'
      ,'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      })};

      this.isLoggedSubject = new BehaviorSubject<boolean> (this.loginStatus)
   }


  login(data:object):Observable<any>{
    this.isLoggedSubject.next(true);
    return this.httpClient.post(`${environment.apiURL}/login`,JSON.stringify(data),this.httpOptions)
   }

   logout(){
    this.isLoggedSubject.next(false);
  }

  get loginStatus(): boolean
  {
    return  (localStorage.getItem('userToken'))? true: false
  }

  isUserLoggedSubject(){
    return this.isLoggedSubject.asObservable();

  }

  register(data:object):Observable<any>{
    return this.httpClient.post(`${environment.apiURL}/register`,JSON.stringify(data),this.httpOptions)
   }

   myProfile():Observable<any>{
    return this.httpClient.get(`${environment.apiURL}/myProfile`,this.httpOptions)
   }
}
