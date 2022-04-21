import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injctor:Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let auth=this.injctor.get(AuthService)
    console.log(req.url);
    if(req.url == `${environment.apiURL}/register` || req.url ==  `${environment.apiURL}/editprofile`)
    {
      let token=req.clone({
        setHeaders:{
          Authorization:`Bearer ${auth.getToken()}`,
          Accept:'application/json',
          // 'Content-Type': 'application/json'
        }
      })
      return next.handle(token)
    }else{

      let token=req.clone({
        setHeaders:{
          Authorization:`Bearer ${auth.getToken()}`,
          Accept:'application/json',
          'Content-Type': 'application/json'
        }
      })
      return next.handle(token)

    }
  }
}
