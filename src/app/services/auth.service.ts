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
      'Content-Type': 'application/json','Accept':' */*'
      // ,'Authorization': 'my-auth-token'
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


}
