import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injctor:Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let auth=this.injctor.get(AuthService)
    let token=req.clone({
      setHeaders:{
        Authorization:`Bearer ${auth.getToken()}`,
        Accept:'Application/json'
      }
    })
    return next.handle(token)
  }
}
