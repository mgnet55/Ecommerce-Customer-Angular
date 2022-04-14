import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private httpOptions = {};
  constructor(private httpClient:HttpClient
  ) {
    this.httpOptions =  {headers: new HttpHeaders({
      'Content-Type': 'application/json','Accept':' */*'
      // ,'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      })};


   }

   getAllProducts(page:number=1):Observable<any>{
    return this.httpClient.get(`${environment.apiURL}/products?page=${page}`,this.httpOptions)
   }

   getProductsByCategory(id:number,page:number=1):Observable<any>{
    return this.httpClient.get(`${environment.apiURL}/products/category/${id}&page=${page}`,this.httpOptions)

   }

   serachProducts(query:string,page:number=1):Observable<any>{
    return this.httpClient.get(`${environment.apiURL}/products?search=${query}&page=${page}`,this.httpOptions)

   }

}
