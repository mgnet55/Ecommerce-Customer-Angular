import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor{

  constructor(private loader:LoaderService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url == `${environment.apiCustomerURL}/login`)
  {
    return next.handle(req)
  }
    this.loader.loader.next(true)
    return next.handle(req).pipe(
      finalize(()=>{
        this.loader.loader.next(false)
      })
    )
  }
}
